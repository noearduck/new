let highlightedElement = null;
let isZoomedIn = false;

document.getElementById('main-image').addEventListener('mousemove', function(event) {
    if (isZoomedIn) return;

    const highlightFrame = document.getElementById('highlight-frame');
    const x = event.offsetX;
    const y = event.offsetY;

    const areas = [
        {name: 'coffee', x: 90, y: 260, width: 80, height: 120},
        {name: 'fruit', x: 300, y: 250, width: 120, height: 100},
        {name: 'desk', x: 450, y: 300, width: 100, height: 100}
    ];

    let hoveredArea = null;

    areas.forEach(area => {
        if (x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height) {
            hoveredArea = area;
        }
    });

    if (hoveredArea) {
        highlightFrame.style.display = 'block';
        highlightFrame.style.left = hoveredArea.x + 'px';
        highlightFrame.style.top = hoveredArea.y + 'px';
        highlightFrame.style.width = hoveredArea.width + 'px';
        highlightFrame.style.height = hoveredArea.height + 'px';
        highlightedElement = hoveredArea;
    } else {
        highlightFrame.style.display = 'none';
        highlightedElement = null;
    }
});

document.getElementById('main-image').addEventListener('click', function(event) {
    if (highlightedElement && !isZoomedIn) {
        const options = document.getElementById('options');
        options.style.display = 'block';
        options.style.left = highlightedElement.x + 'px';
        options.style.top = highlightedElement.y + 'px';
        document.getElementById('option-text').innerText = `${highlightedElement.name} 선택지:`;
    }
});

function hideOptions() {
    document.getElementById('options').style.display = 'none';
}

function zoomIn() {
    const img = document.getElementById('main-image');
    const selectImage = document.getElementById('selectimage');
    const scale = 2;

    // 이미지 확대 애니메이션 시작
    img.style.transition = 'transform 0.5s ease'; // 애니메이션 시간 설정
    img.style.transform = `scale(${scale})`;
    document.getElementById('options').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('highlight-frame').style.display = 'none';
    isZoomedIn = true;

    // 확대 기준점 계산
    const imgRect = img.getBoundingClientRect();
    const centerX = imgRect.left + imgRect.width / 2;
    const centerY = imgRect.top + imgRect.height / 2;

    // 새 이미지를 확대 기준점에 배치
    selectImage.style.position = 'absolute';
    selectImage.style.left = centerX - (selectImage.width / 2) + 'px';
    selectImage.style.top = centerY - (selectImage.height / 2) + 'px';
    selectImage.style.display = 'block'; // 새 이미지 표시

    // 애니메이션 완료 후 추가 설정
    setTimeout(() => {
        // 추가적인 동작이 필요할 경우 여기에 작성
    }, 700); // 확대 애니메이션 시간과 일치하도록 설정
}




function zoomOut() {
    const img = document.getElementById('main-image');
    img.style.transform = 'scale(1)';
    document.getElementById('back-button').style.display = 'none';
    isZoomedIn = false;
    document.getElementById('imageContainer').style.display = 'none'; // 확대된 이미지 숨김
}

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('imageContainer').style.display = 'none';
});
