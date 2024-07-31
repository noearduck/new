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
    const scale = 2;

    img.style.transform = `scale(${scale})`;
    document.getElementById('options').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('highlight-frame').style.display = 'none';
    isZoomedIn = true;

    // 확대 애니메이션이 완료된 후에 이미지 보여주기
    setTimeout(() => {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.style.display = 'block';
        
        const selectImage = document.getElementById('selectimage');
        
        // 확대된 이미지의 중앙 위치 계산
        const centerX = imgRect.left + imgRect.width / 2;
        const centerY = imgRect.top + imgRect.height / 2;

        // 새 이미지를 중앙에 배치
        selectImage.style.position = 'absolute';
        selectImage.style.left = centerX;
        selectImage.style.top = centerY;
        selectImage.style.display = 'block';
    }, 1000); // 확대 애니메이션 시간과 일치하도록 설정
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
