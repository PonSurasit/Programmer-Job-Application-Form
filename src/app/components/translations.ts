
export const translations = {
    th: {
      // Form Steps
      personalInfo: 'ข้อมูลส่วนตัว',
      educationAndSkills: 'การศึกษาและทักษะ',
      applicationDetails: 'รายละเอียดการสมัคร',
      
      // Personal Info Fields
      fullName: 'ชื่อ-นามสกุล',
      gender: 'เพศ',
      male: 'ชาย',
      female: 'หญิง',
      email: 'อีเมล',
      phone: 'เบอร์โทรศัพท์',
      birthDate: 'วันเกิด',
      address: 'ที่อยู่',
      age:'อายุ',
  
      // Education Fields
      education: 'วุฒิการศึกษา',
      bachelor: 'ปริญญาตรี',
      master: 'ปริญญาโท',
      phd: 'ปริญญาเอก',
      vocationalCert: 'ปวช.',
      highVocationalCert: 'ปวส.',
      university: 'สถาบันการศึกษา',
      major: 'สาขาวิชา',
      gpa: 'เกรดเฉลี่ย',
      
      // Skills Fields
      programmingSkills: 'ทักษะการเขียนโปรแกรม',
      frameworks: 'เฟรมเวิร์คที่ใช้งานได้',
      languages: 'ภาษาที่ใช้งานได้',
      experience: 'ประสบการณ์ทำงาน',
      hasExperience: 'มีประสบการณ์',
      noExperience: 'ไม่มีประสบการณ์',
      experienceDetails: 'รายละเอียดประสบการณ์',
      other: 'อื่นๆ',
  
      // Application Details
      position: 'ตำแหน่งที่สมัคร',
      expectedSalary: 'เงินเดือนที่คาดหวัง (บาท)',
      startDate: 'วันที่สามารถเริ่มงานได้',
      resume: 'Resume / CV',
      additionalInfo: 'ข้อมูลเพิ่มเติม (ถ้ามี)',
      uploadResume:'อัพโหลด',
      fileSupport:'รองรับไฟล์ PDF เท่านั้น ขนาดไม่เกิน 10MB',
      size:'ขนาด',
      dFile:'ลบไฟล์',
  
      // Navigation
      next: 'ถัดไป',
      back: 'ย้อนกลับ',
      submit: 'ส่งใบสมัคร',
  
      // Form Headers
      formTitle: 'สมัครงานตำแหน่งโปรแกรมเมอร์',
      formSubtitle: 'กรุณากรอกข้อมูลให้ครบถ้วนทุกขั้นตอน',
  
      // Placeholders
      enterFullName: 'กรอกชื่อ-นามสกุล',
      enterEmail: 'กรอกอีเมล',
      enterPhone: 'กรอกเบอร์โทรศัพท์',
      enterAddress: 'กรอกที่อยู่ปัจจุบัน',
      enterUniversity: 'กรอกชื่อสถาบันการศึกษา',
      enterMajor: 'กรอกสาขาวิชา',
      enterGPA: '0.00',
      enterExperience: 'กรุณาระบุรายละเอียดประสบการณ์ทำงานที่ผ่านมา',
      enterSalary: 'ระบุเงินเดือนที่คาดหวัง',
      enterAdditionalInfo: 'ข้อมูลเพิ่มเติมที่ต้องการแจ้ง',
      specifyOtherProgrammingSkills: 'ระบุทักษะการเขียนโปรแกรมอื่นๆ',
      specifyOtherFrameworks: 'ระบุเฟรมเวิร์คอื่นๆ',
      specifyOtherLanguages: 'ระบุภาษาอื่นๆ',
      enterAge: 'กรุณากรอกอายุ',
  
      // Validation Messages
      required: 'กรุณากรอก',
      invalidPhone: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)',
      invalidEmail: 'กรุณากรอกอีเมลให้ถูกต้อง',
      invalidGPA: 'กรุณากรอกเกรดเฉลี่ยให้ถูกต้อง (0-4)',
      selectGender: 'กรุณาเลือกเพศ',
      selectEducation: 'กรุณาเลือกวุฒิการศึกษา',
      selectPosition: 'กรุณาเลือกตำแหน่ง',
      selectExperience: 'กรุณาเลือกสถานะประสบการณ์ทำงาน',

      validation: {
        required: {
          fullName: 'กรุณากรอกชื่อ-นามสกุล',
          phone: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)',
          email: 'กรุณากรอกอีเมลให้ถูกต้อง',
          birthDate: 'กรุณาเลือกวันเกิด',
          gender: 'กรุณาเลือกเพศ',
          address: 'กรุณากรอกที่อยู่',
          education: 'กรุณาเลือกวุฒิการศึกษา',
          university: 'กรุณากรอกชื่อสถาบันการศึกษา',
          major: 'กรุณากรอกสาขาวิชา',
          gpa: 'กรุณากรอกเกรดเฉลี่ยให้ถูกต้อง (0-4)',
          position: 'กรุณาเลือกตำแหน่งที่สมัคร',
          expectedSalary: 'กรุณากรอกเงินเดือนที่คาดหวัง',
          startDate: 'กรุณาเลือกวันที่สามารถเริ่มงานได้',
          resume: 'กรุณาอัพโหลด Resume / CV'
        },
        invalid: {
          phone: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)',
          email: 'กรุณากรอกอีเมลให้ถูกต้อง',
          gpa: 'กรุณากรอกเกรดเฉลี่ยให้ถูกต้อง (0-4)',
          salary: 'กรุณากรอกเงินเดือนที่คาดหวังให้ถูกต้อง',
          age:'กรุณากรอกอายุ',
        },
        select: {
          programmingSkills: 'กรุณาเลือกทักษะการเขียนโปรแกรมอย่างน้อย 1 ทักษะ',
          frameworks: 'กรุณาเลือกเฟรมเวิร์คที่ใช้งานได้อย่างน้อย 1 เฟรมเวิร์ค',
          languages: 'กรุณาเลือกภาษาที่ใช้ได้อย่างน้อย 1 ภาษา',
          experience: 'กรุณาเลือกสถานะประสบการณ์ทำงาน'
        },
        specify: {
          programmingSkills: 'กรุณาระบุทักษะการเขียนโปรแกรมอื่นๆ',
          frameworks: 'กรุณาระบุเฟรมเวิร์คอื่นๆ',
          languages: 'กรุณาระบุภาษาอื่นๆ',
          experience: 'กรุณากรอกรายละเอียดประสบการณ์ทำงาน'
        }
      },
      alert: {
        error: {
          title: 'พบข้อผิดพลาด',
          confirm: 'ตกลง'
        }
      },
      fileValidation: {
        pdfOnly: 'กรุณาอัปโหลดไฟล์ PDF เท่านั้น',
        maxSize: 'ขนาดไฟล์ต้องไม่เกิน 10MB'
      },
      flieUpload:{
        error:{
          title:'ไม่สามารถอัปโหลดไฟล์ได้',
          confirm:'ตกลง'
        }
      },
      stepNavigation: {
        stepComplete: 'ขั้นตอนที่ {step} เสร็จสมบูรณ์',
        goingToNext: 'กำลังไปขั้นตอนถัดไป...'
      },
      submitSuccess: {
        title: 'ส่งใบสมัครเรียบร้อย!',
        message: 'ขอบคุณที่สนใจร่วมงานกับเรา',
        confirm: 'ตกลง'
      },
      reviewApplication: 'ตรวจสอบข้อมูลใบสมัคร',
      applicationSummary: 'สรุปข้อมูลใบสมัคร',
      close: 'ปิด',
      confirmAndSubmit: 'ยืนยันและส่งใบสมัคร',
      submittedApplication: 'ข้อมูลใบสมัครของคุณ',
      edit: 'แก้ไข',
      save: 'บันทึก',
      cancel: 'ยกเลิก',
      editSuccess: 'แก้ไขข้อมูลสำเร็จ',
      editSuccessMessage: 'ข้อมูลของคุณได้รับการอัพเดทเรียบร้อยแล้ว',
      applyAgain: 'สมัครงานใหม่',
      confirmCancel: 'ยืนยันการยกเลิก?',
      confirmCancelMessage: 'คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการแก้ไข? ข้อมูลที่แก้ไขจะไม่ถูกบันทึก',
      confirm: 'ยืนยัน',
      continue: 'ดำเนินการต่อ',
      confirmedit:'ตกลง'
    },
    en: {
      // Form Steps
      personalInfo: 'Personal Information',
      educationAndSkills: 'Education & Skills',
      applicationDetails: 'Application Details',
      
      // Personal Info Fields
      fullName: 'Full Name',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      email: 'Email',
      phone: 'Phone Number',
      birthDate: 'Date of Birth',
      address: 'Address',
      age:'Age',
  
      // Education Fields
      education: 'Education',
      bachelor: "Bachelor's Degree",
      master: "Master's Degree",
      phd: 'Doctorate',
      vocationalCert: 'Vocational Certificate',
      highVocationalCert: 'High Vocational Certificate',
      university: 'Educational Institution',
      major: 'Major',
      gpa: 'GPA',
      
      // Skills Fields
      programmingSkills: 'Programming Skills',
      frameworks: 'Frameworks',
      languages: 'Languages',
      experience: 'Work Experience',
      hasExperience: 'Has Experience',
      noExperience: 'No Experience',
      experienceDetails: 'Experience Details',
      other: 'Other',
  
      // Application Details
      position: 'Position',
      expectedSalary: 'Expected Salary (THB)',
      startDate: 'Available Start Date',
      resume: 'Resume / CV',
      additionalInfo: 'Additional Information (Optional)',
      uploadResume:'Upload',
      fileSupport:'Only PDF files are supported, size not exceeding 10MB',
      size:'Size',
      dFile:'Delete File',
  
      // Navigation
      next: 'Next',
      back: 'Back',
      submit: 'Submit Application',
  
      // Form Headers
      formTitle: 'Programmer Job Application',
      formSubtitle: 'Please complete all steps of the application',
  
      // Placeholders
      enterFullName: 'Enter your full name',
      enterEmail: 'Enter your email',
      enterAge: 'Enter your age',
      enterPhone: 'Enter your phone number',
      enterAddress: 'Enter your current address',
      enterUniversity: 'Enter your educational institution',
      enterMajor: 'Enter your major',
      enterGPA: '0.00',
      enterExperience: 'Please provide details of your work experience',
      enterSalary: 'Enter expected salary',
      enterAdditionalInfo: 'Enter any additional information',
      specifyOtherProgrammingSkills: 'Specify other programming skills',
      specifyOtherFrameworks: 'Specify other frameworks',
      specifyOtherLanguages: 'Specify other languages',
  
      // Validation Messages
      required: 'Please enter',
      invalidPhone: 'Please enter a valid phone number (10 digits)',
      invalidEmail: 'Please enter a valid email address',
      invalidGPA: 'Please enter a valid GPA (0-4)',
      selectGender: 'Please select gender',
      selectEducation: 'Please select education level',
      selectPosition: 'Please select position',
      selectExperience: 'Please select work experience status',

      validation: {
        required: {
          fullName: 'Please enter your full name',
          phone: 'Please enter a valid phone number (10 digits)',
          email: 'Please enter a valid email',
          birthDate: 'Please select your date of birth',
          gender: 'Please select your gender',
          address: 'Please enter your address',
          education: 'Please select educational qualification',
          university: 'Please enter your educational institution',
          major: 'Please enter your major',
          gpa: 'Please enter a valid GPA (0-4)',
          position: 'Please select a position',
          expectedSalary: 'Please enter your expected salary',
          startDate: 'Please select your available start date',
          resume: 'Please upload your Resume / CV'
        },
        invalid: {
          phone: 'Please enter a valid phone number (10 digits)',
          email: 'Please enter a valid email format',
          gpa: 'Please enter a valid GPA between 0 and 4',
          salary: 'Please enter a valid expected salary',
          age:'Please enter your age',
        },
        select: {
          programmingSkills: 'Please select at least 1 programming skill',
          frameworks: 'Please select at least 1 framework',
          languages: 'Please select at least 1 language',
          experience: 'Please select your work experience status'
        },
        specify: {
          programmingSkills: 'Please specify other programming skills',
          frameworks: 'Please specify other frameworks',
          languages: 'Please specify other languages',
          experience: 'Please provide work experience details'
        }
      },
      alert: {
        error: {
          title: 'Error Found',
          confirm: 'OK'
        }
      },
      fileValidation: {
        pdfOnly: 'Please upload PDF files only',
        maxSize: 'File size must not exceed 10MB'
      },
      flieUpload:{
        error:{
          title:'Unable to upload file',
          confirm:'OK'
        }
      },
      stepNavigation: {
        stepComplete: 'Step {step} Complete',
        goingToNext: 'Going to next step...'
      },
      submitSuccess: {
        title: 'Application Submitted Successfully!',
        message: 'Thank you for your interest in working with us',
        confirm: 'OK'
      },
      reviewApplication: 'Review Application',
      applicationSummary: 'Application Summary',
      close: 'Close',
      confirmAndSubmit: 'Confirm & Submit',
      submittedApplication: 'Your Application Data',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      editSuccess: 'Edit Successful',
      editSuccessMessage: 'Your information has been updated successfully',
      applyAgain: 'Apply Again',
      confirmCancel: 'Confirm Cancel?',
      confirmCancelMessage: 'Are you sure you want to cancel editing? Your changes will not be saved.',
      confirm: 'Confirm', // ถ้ายังไม่มี
      continue: 'Continue',
      confirmedit:'OK'

    }
  };