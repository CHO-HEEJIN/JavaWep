function validateAndLogin() {
    let valid = true;
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    // 아이디 검사
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(username)) {
        showError('usernameInput', '아이디는 4~20자 영문/숫자만 가능합니다.');
        valid = false;
    } else {
        clearError('usernameInput');
    }

    // 패스워드 검사
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('passwordInput', '8자 이상, 영문 + 숫자 + 특수문자를 포함 필요.');
        valid = false;
    } else {
        clearError('passwordInput');
    }

    if (valid) submitLogin();
}

async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    const hashed = await hashPassword(password);
    document.getElementById('password').value = hashed;
    document.getElementById('loginForm').submit();
}

// login.js 하단에 추가
window.addEventListener('load', function () {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error === '1') {
        /* 여기에 코드를 작성하시오 */
        // 힌트 1 : showError() 함수 재활용
        // 힌트 2 : 아이디와 패스워드 중
        // 어느 필드에 메시지를 표시할지 정
        // 힌트 3 : 메시지 내용
        // "아이디 또는 패스워드가 올바르지 않습니다."
        const field = document.getElementById('passwordInput');
        field.classList.add('is-invalid');
        document.getElementById('passwordMsg').textContent = '아이디 또는 패스워드가 올바르지 않습니다.';
    }
});