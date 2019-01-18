function onSelectChange(elm) {
  loadCameraSrc(elm.value)
}

function loadCameraSrc(deviceId) {
  const videoSettings = deviceId ? {
    optional: [{ sourceId: deviceId }]
  } : true;

  navigator.mediaDevices
    .getUserMedia({
      video: videoSettings
    })
    .then(stream => {
      const videoElm = document.getElementById('camera');

      videoElm.onloadedmetadata = function() {
        videoElm.play();
      };

      videoElm.srcObject = stream;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  loadCameraSrc();

  navigator.mediaDevices
    .enumerateDevices({ video: true })
    .then(items => {
      return items.filter(item => item.kind === 'videoinput');
    })
    .then(devices => {
      const dropdownElm = document.getElementById('cam-dropdown');

      devices.forEach(item => {
        const option = document.createElement('option');

        option.text = item.label;
        option.value = item.deviceId;

        dropdownElm.add(option);
      });
    });
});
