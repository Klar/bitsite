const HandcashUrl = "https://api.handcash.io/api/receivingAddress/";

if (window.location.hash){
  getHandcashHandle();
};

async function getHandcashHandle(handleId){
  if (handleId) {
    var handle = document.getElementById(handleId).value
    window.location.hash = "#" + handle
  } else {
    var handle = window.location.hash;
  };

  if (handle.startsWith("$") | handle.startsWith("#")){
    handle = handle.substr(1);
  }

  var url = HandcashUrl + handle;
  const response = await fetch(url, {});
  const handcashHandle = await response.json();
  // console.log(handcashHandle.receivingAddress);
  document.getElementById("handle").innerHTML = "$" + handle;
  document.getElementById("handcashHandleAddress").innerHTML = handcashHandle.receivingAddress;

  document.getElementById("copyToClipboard").style.display = "inline";

  generateQr(handcashHandle.receivingAddress, "handcashHandleQR")
};

function generateQr(qrValue, elementId) {
  // console.log(qrValue);
  // console.log(elementId);
  var qr = new QRious({
    element: document.getElementById(elementId),
    size: 250,
    value: qrValue
  });
};


function copyToClipboard() {
  /* Get the text field */
  var copyText = document.getElementById("handcashHandleAddress").innerHTML;
  console.log(copyText);

  // Create new element
  var el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = copyText;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);

  /* Alert the copied text */
  document.getElementById("copyToClipboard").innerHTML = "copied";
  // alert("Copied the text: " + copyText);
}
