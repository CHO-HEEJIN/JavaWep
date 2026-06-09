window.onload = function () {
    fetch('/profile/info')
        .then(res => res.json())
        .then(data => {
            document.getElementById('infoUsername').textContent
            = data.username; // DOM 조작 방지
            document.getElementById('infoEmail').textContent
                = data.email;
            document.getElementById('infoPhone').textContent
                = data.phone;
            if (data.profileImage) { // null 체크
                document.getElementById('profileImg').src
                    = '/uploads/profile/' + data.profileImage;
            }
        });
    // URL 파라미터 오류 감지 추가
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    /* 여기에 코드(if 조건문)를 작성하시오 */
    // 힌트 1 : uploadErrorMsg div 의 d-none 클래스 제거
    // 힌트 2 : 표시할 메시지
    // invalid_type → "jpg, png, gif, webp 파일만 가능합니다."
    // too_large → "파일 크기는 5MB 이하여야 합니다."
    // upload_fail → "업로드 실패. 다시 시도해주세요."
    if (error) {
        const msgMap = {
            'invalid_type': 'jpg, png, gif, webp 파일만 가능합니다.',
            'too_large': '파일 크기는 5MB 이하여야 합니다.',
            'upload_fail': '업로드 실패. 다시 시도해주세요.'
        };
        const errorDiv = document.getElementById('uploadErrorMsg');
        errorDiv.textContent = msgMap[error] || '오류가 발생했습니다.';
        errorDiv.classList.remove('d-none');
    }
}