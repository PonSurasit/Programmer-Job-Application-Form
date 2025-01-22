import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Eye, X } from 'lucide-react';
import Swal from 'sweetalert2';
import LanguageSwitcher from './LanguageSwitcher';
import { translations } from './translations';

// Types
type FormData = {
  // ขั้นตอนที่ 1: ข้อมูลส่วนตัว
  fullName: string;
  phone: string;
  gender: 'ชาย' | 'หญิง' | 'male' | 'female' | '';
  email: string;
  age: string;
  birthDate: string;
  address: string;
  
  // ขั้นตอนที่ 2: การศึกษาและทักษะ
  education: string;
  major: string;
  gpa: string;
  programmingSkills: string[];
  frameworks: string[];
  languages: string[];
  experience: 'มี' | 'ไม่มี' | '';
  experienceDetails?: string;  
  otherProgrammingSkill: string;
  otherFramework: string;
  otherLanguage: string;
  university: string;
  
  // ขั้นตอนที่ 3: รายละเอียดการสมัคร
  position: string;
  expectedSalary: string;
  startDate: string;
  resume: File | null;
  additionalInfo: string;
}

interface LanguageOption {
  value: string;
  labelTh: string;
  labelEn: string;
}

const JobApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const t = translations[lang];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submittedFormData, setSubmittedFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    birthDate: '',
    age: '',
    gender: '',
    address: '',
    education: '',
    major: '',
    gpa: '',
    programmingSkills: [],
    frameworks: [],
    languages: [],
    experience: '',
    experienceDetails: '',
    position: '',
    expectedSalary: '',
    startDate: '',
    resume: null,
    additionalInfo: '',
    otherProgrammingSkill: '',
    otherFramework: '',
    otherLanguage: '',
    university: '',
  });
  const [editingData, setEditingData] = useState<FormData>({...submittedFormData});
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    age:'',
    birthDate: '',
    address: '',
    education: '',
    major: '',
    gpa: '',
    programmingSkills: [],
    frameworks: [],
    languages: [],
    experience: '',
    experienceDetails: '',
    position: '',
    expectedSalary: '',
    startDate: '',
    resume: null,
    additionalInfo: '',
    otherProgrammingSkill: '',
    otherFramework: '',
    otherLanguage: '',
    university: '',
  });

  // ตำแหน่งงาน
  const positionTypes = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'DevOps Engineer'
  ];

  // ทักษะการเขียนโปรแกรม
  const programmingSkillsList = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Swift',
    'Kotlin',
    'Dart'
  ];

  // เฟรมเวิร์ค
  const frameworksList = [
    'React',
    'Vue',
    'Angular',
    'Node.js',
    'Django',
    'Laravel',
    'Spring Boot',
    'Flutter',
    'React Native'
  ];

  // ภาษา
  const languagesList: LanguageOption[] = [
    { value: 'thai', labelTh: 'ไทย', labelEn: 'Thai' },
    { value: 'english', labelTh: 'อังกฤษ', labelEn: 'English' },
    { value: 'chinese', labelTh: 'จีน', labelEn: 'Chinese' },
    { value: 'japanese', labelTh: 'ญี่ปุ่น', labelEn: 'Japanese' },
  ];

  // แสดงข้อความแจ้งเตือนความผิดพลาด
  const showValidationErrors = (errorMessages: string[]) => {
    Swal.fire({
      icon: 'error',
      title: translations[lang].alert.error.title,
      html: errorMessages.join('<br>'),
      confirmButtonText: translations[lang].alert.error.confirm,
      confirmButtonColor: '#3b82f6'
    });
  };

  // ตรวจสอบความถูกต้องของข้อมูล
  const validateStep = (currentStep: number) => {
    const errorMessages: string[] = [];
    const v = translations[lang].validation;

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        errorMessages.push(v.required.fullName);
      }
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorMessages.push(v.invalid.email);
      }
      if (!formData.phone.match(/^\d{10}$/)) {
        errorMessages.push(v.invalid.phone);
      }
      if (!formData.birthDate) {
        errorMessages.push(v.required.birthDate);
      }
      if (!formData.age.match(/^\d+$/)) {
        errorMessages.push(v.invalid.age);
      }
      
      if (!formData.gender) {
        errorMessages.push(v.required.gender);
      }
      if (!formData.address.trim()) {
        errorMessages.push(v.required.address);
      }
    }

    if (currentStep === 2) {
      if (!formData.education.trim()) {
        errorMessages.push(v.required.education);
      }
      if (!formData.university.trim()) {
        errorMessages.push(v.required.university);
      }
      if (!formData.major.trim()) {
        errorMessages.push(v.required.major);
      }
      if (!formData.gpa || Number(formData.gpa) < 0 || Number(formData.gpa) > 4) {
        errorMessages.push(v.invalid.gpa);
      }
      if (formData.programmingSkills.length === 0) {
        errorMessages.push(v.select.programmingSkills);
      }
      if (formData.programmingSkills.includes('อื่นๆ') && !formData.otherProgrammingSkill.trim()) {
        errorMessages.push(v.specify.programmingSkills);
      }
      if (formData.frameworks.length === 0) {
        errorMessages.push(v.select.frameworks);
      }
      if (formData.frameworks.includes('อื่นๆ') && !formData.otherFramework.trim()) {
        errorMessages.push(v.specify.frameworks);
      }
      if (formData.languages.length === 0) {
        errorMessages.push(v.select.languages);
      }
      if (formData.languages.includes('อื่นๆ') && !formData.otherLanguage.trim()) {
        errorMessages.push(v.specify.languages);
      }
      if (!formData.experience) {
        errorMessages.push(v.select.experience);
      }
      if (formData.experience === 'มี' && !formData.experienceDetails?.trim()) {
        errorMessages.push(v.specify.experience);
      }
    }

    if (currentStep === 3) {
      if (!formData.position) {
        errorMessages.push(v.required.position);
      }
      if (!formData.expectedSalary) {
        errorMessages.push(v.required.expectedSalary);
      } else {
        // แปลงเป็นตัวเลขเพื่อตรวจสอบค่า
        const salary = Number(formData.expectedSalary.replace(/,/g, ''));
        if (isNaN(salary) || salary <= 0) {
          errorMessages.push(v.invalid.salary);
        }
      }
      if (!formData.startDate) {
        errorMessages.push(v.required.startDate);
      }
      if (!formData.resume) {
        errorMessages.push(v.required.resume);
      }
    }
    
    if (errorMessages.length > 0) {
      showValidationErrors(errorMessages);
      return false;
    }
    return true;
  };

  const validateAllSteps = () => {
    let allErrors: string[] = [];
  
    // ตรวจสอบขั้นตอนที่ 1
    const getStepErrors = (step: number) => {
      const errorMessages: string[] = [];
      const v = translations[lang].validation;
  
      if (step === 1) {
        if (!formData.fullName.trim()) {
          errorMessages.push(v.required.fullName);
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errorMessages.push(v.invalid.email);
        }
        if (!formData.phone.match(/^\d{10}$/)) {
          errorMessages.push(v.invalid.phone);
        }
        if (!formData.birthDate) {
          errorMessages.push(v.required.birthDate);
        }
        if (!formData.age.match(/^\d+$/)) {
          errorMessages.push(v.invalid.age);
        }
        
        if (!formData.gender) {
          errorMessages.push(v.required.gender);
        }
        if (!formData.address.trim()) {
          errorMessages.push(v.required.address);
        }
      }
  
      if (step === 2) {
        if (!formData.education.trim()) {
          errorMessages.push(v.required.education);
        }
        if (!formData.university.trim()) {
          errorMessages.push(v.required.university);
        }
        if (!formData.major.trim()) {
          errorMessages.push(v.required.major);
        }
        if (!formData.gpa || Number(formData.gpa) < 0 || Number(formData.gpa) > 4) {
          errorMessages.push(v.invalid.gpa);
        }
        if (formData.programmingSkills.length === 0) {
          errorMessages.push(v.select.programmingSkills);
        }
        if (formData.programmingSkills.includes('อื่นๆ') && !formData.otherProgrammingSkill.trim()) {
          errorMessages.push(v.specify.programmingSkills);
        }
        if (formData.frameworks.length === 0) {
          errorMessages.push(v.select.frameworks);
        }
        if (formData.frameworks.includes('อื่นๆ') && !formData.otherFramework.trim()) {
          errorMessages.push(v.specify.frameworks);
        }
        if (formData.languages.length === 0) {
          errorMessages.push(v.select.languages);
        }
        if (formData.languages.includes('อื่นๆ') && !formData.otherLanguage.trim()) {
          errorMessages.push(v.specify.languages);
        }
        if (!formData.experience) {
          errorMessages.push(v.select.experience);
        }
        if (formData.experience === 'มี' && !formData.experienceDetails?.trim()) {
          errorMessages.push(v.specify.experience);
        }
      }
  
      if (step === 3) {
        if (!formData.position) {
          errorMessages.push(v.required.position);
        }
        if (!formData.expectedSalary) {
          errorMessages.push(v.required.expectedSalary);
        } else {
          // แปลงเป็นตัวเลขเพื่อตรวจสอบค่า
          const salary = Number(formData.expectedSalary.replace(/,/g, ''));
          if (isNaN(salary) || salary <= 0) {
            errorMessages.push(v.invalid.salary);
          }
        }
        if (!formData.startDate) {
          errorMessages.push(v.required.startDate);
        }
        if (!formData.resume) {
          errorMessages.push(v.required.resume);
        }
      }
  
      return errorMessages;
    };
  
    // ตรวจสอบทั้ง 3 ขั้นตอน
    for (let i = 1; i <= 3; i++) {
      const stepErrors = getStepErrors(i);
      allErrors = [...allErrors, ...stepErrors];
    }
  
    return allErrors;
  };

  const formatNumber = (num: string) => {
    // ลบลูกน้ำและเลข 0 นำหน้าออก
    const number = num.replace(/,/g, '').replace(/^0+/, '');
    
    // ตรวจสอบว่าเป็นตัวเลขที่ถูกต้องหรือไม่
    if (!number || isNaN(Number(number))) return '';
    
    // จัดรูปแบบให้มีลูกน้ำ
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    // จัดการเฉพาะกรณีของ expectedSalary
    if (name === 'expectedSalary') {
      const sanitizedValue = value.replace(/[^\d,]/g, ''); // ลบตัวอักษรที่ไม่ใช่ตัวเลขหรือลูกน้ำ
      const formattedValue = formatNumber(sanitizedValue);
      if (isEditing) {
        setEditingData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
      return; // หยุดการประมวลผลที่เหลือ
    }
  
    // กรณีทั่วไปสำหรับฟิลด์อื่นๆ
    if (isEditing) {
      setEditingData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  // จัดการการเลือก checkbox
  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof FormData] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  // ตรวจสอบไฟล์
  const validateFile = (file: File): string | null => {
    // รับเฉพาะ PDF
    if (file.type !== 'application/pdf') {
      return translations[lang].fileValidation.pdfOnly;
    }
  
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return translations[lang].fileValidation.maxSize;
    }
  
    return null;
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
  };

  // จัดการการอัพโหลดไฟล์
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const errorMessage = validateFile(file);
      if (errorMessage) {
        Swal.fire({
          icon: 'error',
          title: translations[lang].flieUpload.error.title,
          text: errorMessage,
          confirmButtonText: translations[lang].flieUpload.error.confirm,
          confirmButtonColor: '#3b82f6'
        });
        e.target.value = '';
        return;
      }
  
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  // ฟังก์ชันนำทาง
  const nextStep = () => {
    if (validateStep(step)) {
      Swal.fire({
        icon: 'success',
        title: translations[lang].stepNavigation.stepComplete.replace('{step}', String(step)),
        text: translations[lang].stepNavigation.goingToNext,
        timer: 1000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      }).then(() => {
        setStep(prev => prev + 1);
      });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  // จัดการการส่งฟอร์ม
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      Swal.fire({
        icon: 'success',
        title: translations[lang].submitSuccess.title,
        html: `<p>${translations[lang].submitSuccess.message}</p>`,
        confirmButtonText: translations[lang].submitSuccess.confirm,
        confirmButtonColor: '#3b82f6'
      }).then(() => {
        // เก็บข้อมูลเดิมไว้ก่อนที่จะรีเซ็ต
        const submittedData = { ...formData };
        setSubmittedFormData(submittedData);
        setIsSubmitted(true);
        setShowSummary(false);
  
        // ไม่ต้องรีเซ็ตฟอร์มทันที เพราะต้องใช้ข้อมูลในการแสดงผล
        // setFormData({...}) ย้ายไปไว้ในปุ่ม "สมัครงานใหม่" แทน
      });
    }
  };

  const formVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const isStep3DataComplete = () => {
    return (
      formData.position && 
      formData.expectedSalary && 
      formData.startDate && 
      formData.resume
    );
  };
  
  
  const handleSaveEdit = () => {
    const errors = validateAllSteps();
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
  
    // อัพเดทข้อมูลจาก editingData
    setSubmittedFormData(editingData);
    setFormData(editingData);
    
    Swal.fire({
      icon: 'success',
      title: t.editSuccess,
      text: t.editSuccessMessage,
      confirmButtonText: t.confirm,
    }).then(() => {
      setIsEditing(false);
    });
  };

  const SummaryModal = () => {
    if (!showSummary) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 text-black">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{t.applicationSummary}</h3>
              <button
                onClick={() => setShowSummary(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <hr className='py-2' />
  
            {/* ส่วนที่ 1: ข้อมูลส่วนตัว */}
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3">{t.personalInfo}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t.fullName}</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.email}</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.phone}</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.gender}</p>
                  <p className="font-medium">{formData.gender === 'male' ? t.male : t.female}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.birthDate}</p>
                  <p className="font-medium">{formData.birthDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.age}</p>
                  <p className="font-medium">{formData.age}</p>
                </div>
                <div className="">
                  <p className="text-sm text-gray-500">{t.address}</p>
                  <p className="font-medium">{formData.address}</p>
                </div>
              </div>
            </div>
            <hr className='py-2' />
  
            {/* ส่วนที่ 2: การศึกษาและทักษะ */}
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3">{t.educationAndSkills}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t.education}</p>
                  <p className="font-medium">{formData.education}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.university}</p>
                  <p className="font-medium">{formData.university}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.major}</p>
                  <p className="font-medium">{formData.major}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.gpa}</p>
                  <p className="font-medium">{formData.gpa}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.programmingSkills}</p>
                  <p className="font-medium">
                    {[
                      ...formData.programmingSkills.filter(skill => skill !== 'อื่นๆ'),
                      ...formData.programmingSkills
                        .filter(skill => skill === 'อื่นๆ')
                        .map(skill => `${skill} (${formData.otherProgrammingSkill?.replace(/\s+/g, '')})`)
                    ].join(',')}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">{t.frameworks}</p>
                  <p className="font-medium">
                    {[
                      ...formData.frameworks.filter(framework => framework !== 'อื่นๆ'),
                      ...formData.frameworks
                        .filter(framework => framework === 'อื่นๆ')
                        .map(framework => `${framework} (${formData.otherFramework?.replace(/\s+/g, '')})`)
                    ].join(',')}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">{t.languages}</p>
                  <p className="font-medium">
                    {[
                      ...formData.languages.filter(language => language !== 'อื่นๆ'),
                      ...formData.languages
                        .filter(language => language === 'อื่นๆ')
                        .map(language => `${language} (${formData.otherLanguage?.replace(/\s+/g, '')})`)
                    ].join(',')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.experience}</p>
                  <p className="font-medium">
                    {formData.experience === 'มี' ? t.hasExperience : t.noExperience}
                  </p>
                </div>
                {formData.experience === 'มี' && formData.experienceDetails && (
                  <div className="">
                    <p className="text-sm text-gray-500">{t.experienceDetails}</p>
                    <p className="font-medium">{formData.experienceDetails}</p>
                  </div>
                )}
              </div>
            </div>
            <hr className='py-2' />
  
            {/* ส่วนที่ 3: รายละเอียดการสมัคร */}
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3">{t.applicationDetails}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t.position}</p>
                  <p className="font-medium">{formData.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.expectedSalary}</p>
                  <p className="font-medium">{formData.expectedSalary}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.startDate}</p>
                  <p className="font-medium">{formData.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.resume}</p>
                  <p className="font-medium">{formData.resume?.name}</p>
                </div>
                <div className="">
                  <p className="text-sm text-gray-500">{t.additionalInfo}</p>
                  <p className="font-medium">{formData.additionalInfo || '-'}</p>
                </div>
              </div>
            </div>
            <hr className='py-2' />
  
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                {t.close}
              </button>
              <button
                  onClick={(e) => {
                    handleSubmit(e);
                    setShowSummary(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {t.confirmAndSubmit}
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SubmittedDataView = () => {
    if (!submittedFormData || !isSubmitted) return null;
  
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
         <LanguageSwitcher 
          currentLang={lang} 
          onLanguageChange={setLang} 
        />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 text-black md:mt-0 mt-5">
        {/* ส่วนหัว */}
        <div className="flex md:flex-row flex-col md:justify-between items-center mb-6">
          <h2 className="text-2xl font-bold md:mb-0 mb-4">{t.submittedApplication}</h2>
          <div className="space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {t.save}
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: t.confirmCancel,
                      text: t.confirmCancelMessage,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: t.confirm,
                      cancelButtonText: t.cancel
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setIsEditing(false);
                        setEditingData({...submittedFormData}); // รีเซ็ตข้อมูลที่กำลังแก้ไขกลับเป็นค่าเดิม
                      }
                    });
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  {t.cancel}
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditingData({...submittedFormData}); // ใช้ข้อมูลจาก submittedFormData เป็นค่าเริ่มต้น
                  }}

                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {t.edit}
                </button>
                <button
                    onClick={() => {
                      setIsSubmitted(false);
                      // รีเซ็ตฟอร์มเมื่อกดสมัครงานใหม่
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        birthDate: '',
                        age:'',
                        gender:'',
                        address: '',
                        education: '',
                        major: '',
                        gpa: '',
                        programmingSkills: [],
                        frameworks: [],
                        languages: [],
                        experience: '',
                        position: '',
                        expectedSalary: '',
                        startDate: '',
                        resume: null,
                        additionalInfo: '',
                        otherProgrammingSkill: '',
                        otherFramework: '',
                        otherLanguage: '',
                        university: '',
                      });
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {t.applyAgain}
                  </button>
              </div>
            )}
          </div>
        </div>
        <hr className='py-2' />
  
          {/* ส่วนที่ 1: ข้อมูลส่วนตัว */}
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3">{t.personalInfo}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* แสดงข้อมูลเหมือนใน Modal แต่เพิ่มความสามารถในการแก้ไข */}
                {Object.entries({
                  fullName: t.fullName,
                  email: t.email,
                  phone: t.phone,
                  gender: t.gender,
                  birthDate: t.birthDate,
                  age: t.age,
                  address: t.address,
                }).map(([key, label]) => (
                  <div key={key} className={key === 'address' ? 'col-span-1' : ''}>
                    <p className="text-sm text-gray-500">{label}</p>
                    {isEditing ? (
                      key === 'address' ? (
                        <textarea
                          name={key}
                          value={editingData[key as keyof FormData] as string}
                          onChange={handleChange}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          placeholder={t.enterAddress}
                        />
                      ) : key === 'gender' ? (
                        <select
                          name={key}
                          value={editingData[key as keyof FormData] as string}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        >
                          <option value="">{t.selectGender}</option>
                          <option value="male">{t.male}</option>
                          <option value="female">{t.female}</option>
                        </select>
                      ) : (
                        <input
                          type={
                            key === 'birthDate' 
                              ? 'date' 
                              : key === 'phone' || key === 'age'
                              ? 'number'
                              : key === 'email'
                              ? 'email'
                              : 'text'
                          }
                          name={key}
                          value={editingData[key as keyof FormData] as string}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          placeholder={
                            key === 'phone' 
                              ? t.enterPhone 
                              : key === 'email' 
                              ? t.enterEmail
                              : key === 'age'
                              ? t.enterAge
                              : key === 'fullName'
                              ? t.enterFullName
                              : ''
                          }
                          min={key === 'birthDate' ? undefined : key === 'age' ? '1' : undefined}
                          max={key === 'birthDate' ? undefined : key === 'age' ? '100' : undefined}
                        />
                      )
                    ) : (
                      <p className="font-medium">
                        {key === 'gender' 
                          ? submittedFormData.gender === 'male' ? t.male : t.female
                          : key === 'resume' 
                          ? submittedFormData.resume?.name
                          : key === 'birthDate' 
                          ? new Date(submittedFormData.birthDate).toLocaleDateString()
                          : Array.isArray(submittedFormData[key as keyof FormData])
                          ? (submittedFormData[key as keyof FormData] as string[]).join(', ')
                          : String(submittedFormData[key as keyof FormData] || '')
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          <hr className='py-2' />
  
           {/* ส่วนที่ 2: การศึกษาและทักษะ */}
        <div className="mb-6">
          <h4 className="font-medium text-lg mb-3 ">{t.educationAndSkills}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education */}
            <div>
              <p className="text-sm text-gray-500">{t.education}</p>
              {isEditing ? (
                <select
                  name="education"
                  value={editingData.education}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">{t.selectEducation}</option>
                  <option value="ปริญญาตรี">{t.bachelor}</option>
                  <option value="ปริญญาโท">{t.master}</option>
                  <option value="ปริญญาเอก">{t.phd}</option>
                  <option value="ปวช.">{t.vocationalCert}</option>
                  <option value="ปวส.">{t.highVocationalCert}</option>
                </select>
              ) : (
                <p className="font-medium">{submittedFormData.education}</p>
              )}
            </div>

            {/* University */}
            <div>
              <p className="text-sm text-gray-500">{t.university}</p>
              {isEditing ? (
                <input
                  type="text"
                  name="university"
                  value={editingData.university}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              ) : (
                <p className="font-medium">{submittedFormData.university}</p>
              )}
            </div>

            {/* Major */}
            <div>
              <p className="text-sm text-gray-500">{t.major}</p>
              {isEditing ? (
                <input
                  type="text"
                  name="major"
                  value={editingData.major}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              ) : (
                <p className="font-medium">{submittedFormData.major}</p>
              )}
            </div>

            {/* GPA */}
            <div>
              <p className="text-sm text-gray-500">{t.gpa}</p>
              {isEditing ? (
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  name="gpa"
                  value={editingData.gpa}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              ) : (
                <p className="font-medium">{submittedFormData.gpa}</p>
              )}
            </div>

            {/* Programming Skills */}
            <div className="col-span-full">
              <p className="text-sm text-gray-500">{t.programmingSkills}</p>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {programmingSkillsList.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`edit-skill-${skill}`}
                        checked={formData.programmingSkills.includes(skill)}
                        onChange={() => handleCheckboxChange('programmingSkills', skill)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label htmlFor={`edit-skill-${skill}`} className="ml-2 text-sm">{skill}</label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit-skill-other"
                      checked={formData.programmingSkills.includes('อื่นๆ')}
                      onChange={() => handleCheckboxChange('programmingSkills', 'อื่นๆ')}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="edit-skill-other" className="ml-2 text-sm">{t.other}</label>
                  </div>
                  {formData.programmingSkills.includes('อื่นๆ') && (
                    <div className="col-span-2 mt-2">
                      <input
                        type="text"
                        name="otherProgrammingSkill"
                        value={formData.otherProgrammingSkill}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder={t.specifyOtherProgrammingSkills}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="font-medium">
                  {[
                    ...submittedFormData.programmingSkills.filter(skill => skill !== 'อื่นๆ'),
                    ...submittedFormData.programmingSkills
                      .filter(skill => skill === 'อื่นๆ')
                      .map(skill => `${skill} (${submittedFormData.otherProgrammingSkill?.replace(/\s+/g, '')})`)
                  ].join(',')}
                </p>
              )}
            </div>

            {/* Frameworks */}
            <div className="col-span-full">
              <p className="text-sm text-gray-500">{t.frameworks}</p>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {frameworksList.map((framework) => (
                    <div key={framework} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`edit-framework-${framework}`}
                        checked={formData.frameworks.includes(framework)}
                        onChange={() => handleCheckboxChange('frameworks', framework)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label htmlFor={`edit-framework-${framework}`} className="ml-2 text-sm">{framework}</label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit-framework-other"
                      checked={formData.frameworks.includes('อื่นๆ')}
                      onChange={() => handleCheckboxChange('frameworks', 'อื่นๆ')}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="edit-framework-other" className="ml-2 text-sm">{t.other}</label>
                  </div>
                  {formData.frameworks.includes('อื่นๆ') && (
                    <div className="col-span-2 mt-2">
                      <input
                        type="text"
                        name="otherFramework"
                        value={formData.otherFramework}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder={t.specifyOtherFrameworks}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="font-medium">
                  {[
                    ...submittedFormData.frameworks.filter(framework => framework !== 'อื่นๆ'),
                    ...submittedFormData.frameworks
                      .filter(framework => framework === 'อื่นๆ')
                      .map(framework => `${framework} (${submittedFormData.otherFramework?.replace(/\s+/g, '')})`)
                  ].join(',')}
                </p>
              )}
            </div>

            {/* Languages */}
            <div className="col-span-full">
              <p className="text-sm text-gray-500">{t.languages}</p>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {languagesList.map((language) => (
                    <div key={language.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`edit-language-${language.value}`}
                        checked={formData.languages.includes(language.value)}
                        onChange={() => handleCheckboxChange('languages', language.value)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label htmlFor={`edit-language-${language.value}`} className="ml-2 text-sm">
                        {lang === 'th' ? language.labelTh : language.labelEn}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit-language-other"
                      checked={formData.languages.includes('อื่นๆ')}
                      onChange={() => handleCheckboxChange('languages', 'อื่นๆ')}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="edit-language-other" className="ml-2 text-sm">{t.other}</label>
                  </div>
                  {formData.languages.includes('อื่นๆ') && (
                    <div className="col-span-2 mt-2">
                      <input
                        type="text"
                        name="otherLanguage"
                        value={formData.otherLanguage}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder={t.specifyOtherLanguages}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="font-medium">
                  {[
                    ...submittedFormData.languages.filter(language => language !== 'อื่นๆ'),
                    ...submittedFormData.languages
                      .filter(language => language === 'อื่นๆ')
                      .map(language => `${language} (${submittedFormData.otherLanguage?.replace(/\s+/g, '')})`)
                  ].join(',')}
                </p>
              )}
            </div>

            {/* Experience */}
            <div className="col-span-full">
              <p className="text-sm text-gray-500">{t.experience}</p>
              {isEditing ? (
                <>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="edit-has-experience"
                        name="experience"
                        value="มี"
                        checked={formData.experience === 'มี'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="edit-has-experience" className="ml-2 text-sm">{t.hasExperience}</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="edit-no-experience"
                        name="experience"
                        value="ไม่มี"
                        checked={formData.experience === 'ไม่มี'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="edit-no-experience" className="ml-2 text-sm">{t.noExperience}</label>
                    </div>
                  </div>
                  {formData.experience === 'มี' && (
                    <textarea
                      name="experienceDetails"
                      value={formData.experienceDetails}
                      onChange={handleChange}
                      rows={4}
                      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  )}
                </>
              ) : (
                <>
                  <p className="font-medium">
                    {submittedFormData.experience === 'มี' ? t.hasExperience : t.noExperience}
                  </p>
                  {submittedFormData.experience === 'มี' && submittedFormData.experienceDetails && (
                    <p className="mt-2 text-sm">{submittedFormData.experienceDetails}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <hr className='py-2' />
        {/* ส่วนที่ 3: รายละเอียดการสมัคร */}
        <div className="mb-6">
          <h4 className="font-medium text-lg mb-3">{t.applicationDetails}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Position */}
            <div>
              <p className="text-sm text-gray-500">{t.position}</p>
              {isEditing ? (
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">{t.selectPosition}</option>
                  {positionTypes.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              ) : (
                <p className="font-medium">{submittedFormData.position}</p>
              )}
            </div>

            {/* Expected Salary */}
            <div>
              <p className="text-sm text-gray-500">{t.expectedSalary}</p>
              {isEditing ? (
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              ) : (
                <p className="font-medium">{submittedFormData.expectedSalary}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <p className="text-sm text-gray-500">{t.startDate}</p>
              {isEditing ? (
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              ) : (
                <p className="font-medium">{submittedFormData.startDate}</p>
              )}
            </div>
            {/* Resume */}
            <div>
              <p className="text-sm text-gray-500">{t.resume}</p>
              {isEditing ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {!formData.resume ? (
                      <>
                        <div className="text-sm text-gray-600">
                          <label
                            htmlFor="edit-resume"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>{t.uploadResume}</span>
                            <input
                              id="edit-resume"
                              name="resume"
                              type="file"
                              onChange={handleFileChange}
                              accept=".pdf"
                              className="sr-only"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">{t.fileSupport}</p>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="flex flex-col">
                            <p className="text-sm text-green-600">{formData.resume.name}</p>
                            <p className="text-xs text-gray-500">
                              {t.size}: {(formData.resume.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <svg 
                            className="w-4 h-4 mr-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                            />
                          </svg>
                          {t.dFile}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="font-medium">{submittedFormData.resume?.name}</p>
              )}
            </div>

            {/* Additional Info */}
            <div className="col-span-full">
              <p className="text-sm text-gray-500">{t.additionalInfo}</p>
              {isEditing ? (
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              ) : (
                <p className="font-medium">{submittedFormData.additionalInfo || '-'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <>
    {!isSubmitted ? (
     
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
       <LanguageSwitcher 
        currentLang={lang} 
        onLanguageChange={setLang} 
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mt-0 mt-5">
          <h1 className="text-3xl font-bold text-gray-900">{t.formTitle}</h1>
          <p className="mt-2 text-gray-600">{t.formSubtitle}</p>
        </div>

        {/* แถบแสดงความคืบหน้า */}
        <div className="mb-8">
          <div className="relative">
            {/* เส้นพื้นหลัง */}
            <div className="absolute top-4 left-0 right-1 h-1 bg-gray-200" />
            
            {/* เส้น progress ที่มี animation */}
            <div 
              className="absolute top-4 left-0 h-1 bg-blue-600 transition-all duration-500 ease-in-out"
              style={{ 
                width: `${((step - 1) / 2) * 100}%`,
              }} 
            />

            {/* ลำดับขั้นตอน */}
            <div className="relative flex justify-between items-center">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: step >= item ? 1 : 0.8,
                      backgroundColor: step >= item ? '#2563eb' : '#e5e7eb'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-full h-8 w-8 flex items-center justify-center text-white bg-gray-200 z-10`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step > item ? <Check size={16} /> : item}
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* ข้อความ */}
            <div className="flex justify-between mt-2">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
              >
                {t.personalInfo}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={`text-sm ${lang === 'th' ? 'sm:pl-12' : 'sm:pl-0'} ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
              >
                {t.educationAndSkills}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className={`text-sm ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
              >
                {t.applicationDetails}
              </motion.span>
            </div>
          </div>
        </div>

        {/* ฟอร์ม */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4 sm:p-8 text-black">
          <AnimatePresence mode="wait">
            {/* ขั้นตอนที่ 1: ข้อมูลส่วนตัว */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">{t.personalInfo}</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterFullName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterEmail}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.phone}
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterPhone}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.birthDate}
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.age}
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterAge}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.gender}
                  </label>
                  <div className="space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{t.male}</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{t.female}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.address}
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterAddress}
                  />
                </div>
              </motion.div>
            )}

            {/* ขั้นตอนที่ 2: การศึกษาและทักษะ */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">{t.educationAndSkills}</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.education}
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="">{t.selectEducation}</option>
                    <option value="ปริญญาตรี">{t.bachelor}</option>
                    <option value="ปริญญาโท">{t.master}</option>
                    <option value="ปริญญาเอก">{t.phd}</option>
                    <option value="ปวช.">{t.vocationalCert}</option>
                    <option value="ปวส.">{t.highVocationalCert}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.university}
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterUniversity}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.major}
                  </label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterMajor}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.gpa}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.programmingSkills}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {programmingSkillsList.map((skill) => (
                      <div key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`skill-${skill}`}
                          checked={formData.programmingSkills.includes(skill)}
                          onChange={() => handleCheckboxChange('programmingSkills', skill)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                    {/* เพิ่มตัวเลือกอื่นๆ */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="skill-other"
                        checked={formData.programmingSkills.includes('อื่นๆ')}
                        onChange={() => handleCheckboxChange('programmingSkills', 'อื่นๆ')}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label
                        htmlFor="skill-other"
                        className="ml-2 text-sm text-gray-700"
                      >
                        {t.other}
                      </label>
                    </div>
                    {formData.programmingSkills.includes('อื่นๆ') && (
                      <div className="col-span-2 mt-2">
                        <input
                          type="text"
                          name="otherProgrammingSkill"
                          value={formData.otherProgrammingSkill}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          placeholder={t.specifyOtherProgrammingSkills}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.frameworks}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {frameworksList.map((framework) => (
                      <div key={framework} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`framework-${framework}`}
                          checked={formData.frameworks.includes(framework)}
                          onChange={() => handleCheckboxChange('frameworks', framework)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`framework-${framework}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {framework}
                        </label>
                      </div>
                    ))}
                    {/* เพิ่มตัวเลือกอื่นๆ */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="framework-other"
                        checked={formData.frameworks.includes('อื่นๆ')}
                        onChange={() => handleCheckboxChange('frameworks', 'อื่นๆ')}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label
                        htmlFor="framework-other"
                        className="ml-2 text-sm text-gray-700"
                      >
                        {t.other}
                      </label>
                    </div>
                    {formData.frameworks.includes('อื่นๆ') && (
                      <div className="col-span-2 mt-2">
                        <input
                          type="text"
                          name="otherFramework"
                          value={formData.otherFramework}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          placeholder={t.specifyOtherFrameworks}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.languages}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {languagesList.map((language) => (
                      <div key={language.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`language-${language.value}`}
                          checked={formData.languages.includes(language.value)}
                          onChange={() => handleCheckboxChange('languages', language.value)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`language-${language.value}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {lang === 'th' ? language.labelTh : language.labelEn}
                        </label>
                      </div>
                    ))}
                    {/* เพิ่มตัวเลือกอื่นๆ */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="language-other"
                        checked={formData.languages.includes('อื่นๆ')}
                        onChange={() => handleCheckboxChange('languages', 'อื่นๆ')}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label
                        htmlFor="language-other"
                        className="ml-2 text-sm text-gray-700"
                      >
                        {t.other}
                      </label>
                    </div>
                    {formData.languages.includes('อื่นๆ') && (
                      <div className="col-span-2 mt-2">
                        <input
                          type="text"
                          name="otherLanguage"
                          value={formData.otherLanguage}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          placeholder={t.specifyOtherLanguages}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.experience}
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="has-experience"
                        name="experience"
                        value="มี"
                        checked={formData.experience === 'มี'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="has-experience" className="ml-2 text-sm text-gray-700">
                        {t.hasExperience}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="no-experience"
                        name="experience"
                        value="ไม่มี"
                        checked={formData.experience === 'ไม่มี'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="no-experience" className="ml-2 text-sm text-gray-700">
                        {t.noExperience}
                      </label>
                    </div>
                  </div>

                  {/* แสดง textarea เมื่อเลือก "มีประสบการณ์" */}
                  {formData.experience === 'มี' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {t.experienceDetails}
                      </label>
                      <textarea
                        name="experienceDetails"
                        value={formData.experienceDetails || ''}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder={t.enterExperience}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ขั้นตอนที่ 3: รายละเอียดการสมัคร */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">{t.applicationDetails}</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.position}
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="">{t.selectPosition}</option>
                    {positionTypes.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.expectedSalary}
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    maxLength={15}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterSalary}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.startDate}
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.resume}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {!formData.resume ? (
                        <>
                          <div className=" text-sm text-gray-600">
                            <label
                              htmlFor="resume"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>{t.uploadResume} Resume / CV</span>
                              <input
                                id="resume"
                                name="resume"
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf"
                                className="sr-only"
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            {t.fileSupport}
                          </p>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="flex flex-col">
                              <p className="text-sm text-green-600">
                                {formData.resume.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {t.size}: {(formData.resume.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg 
                              className="w-4 h-4 mr-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                              />
                            </svg>
                            {t.dFile}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.additionalInfo}
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder={t.enterAdditionalInfo}
                  />
                </div>

                {isStep3DataComplete() && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setShowSummary(true)}
                      className="w-full px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50 flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t.reviewApplication}
                    </button>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

          {/* ปุ่มนำทาง */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t.back}
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {t.next}
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                {t.submit}
              </button>
            )}
          </div>
        </form>
      </div>
      <SummaryModal />
    </div>
    ) : (
      <SubmittedDataView />
    )}
    {/* Modal สรุปข้อมูล */}
    <SummaryModal />
     </>
  );
};

export default JobApplicationForm;