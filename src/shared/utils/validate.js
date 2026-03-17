export const validateRegister = (formData) => {
  const newErrors = {};

  const phoneRegex = /^0\d{9}$/;
  if (!formData.phone) {
    newErrors.phone = "Vui lòng nhập số điện thoại";
  } else if (!phoneRegex.test(formData.phone)) {
    newErrors.phone = "Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    newErrors.email = "Vui lòng nhập email";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Email không đúng định dạng";
  }

  if (!formData.password) {
    newErrors.password = "Vui lòng nhập mật khẩu";
  } else {
    if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 1 chữ số";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 1 chữ thường";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 1 chữ hoa";
    } else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
    }
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Mật khẩu không khớp";
  }

  return newErrors;
};
