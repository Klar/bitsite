const HandcashUrl = "https://api.handcash.io/api/receivingAddress/";

if (window.location.hash){
  setHandcashHandle();
};

async function getHandcash(handle) {

  if (handle) {
    var handle = handle;
    console.log(handle);
  } else if (document.getElementById("handcashHandle") != null) {
    var handle = document.getElementById("handcashHandle").value
  } else {
    var handle = window.location.hash;
  };

  if (handle.startsWith("$") | handle.startsWith("#")){
    handle = handle.substr(1);
  }

  window.location.hash = "#" + handle

  var url = HandcashUrl + handle;

  async function async_fetch(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw (response.status)
  }

  try {
    var handcash = await async_fetch(url);
  } catch (e) {
    var handcash = "";
  };

  // add handle to json
  handcash["handle"] = handle;

  return handcash;
};


async function setHandcashHandle(handle){

  var handcash = await getHandcash(handle);

  if (handcash) {
    document.getElementById("handle").innerHTML = "$" + handcash.handle;
    document.getElementById("handcashHandleAddress").innerHTML = handcash.receivingAddress;
    document.getElementById("copyToClipboard").style.display = "inline";
    document.getElementById("handcashHandleQR").style.display = "inline";
    generateQr(handcash.receivingAddress, "handcashHandleQR")
  } else {
    document.getElementById("handle").innerHTML = "";
    document.getElementById("handcashHandleAddress").innerHTML = "";
    document.getElementById("copyToClipboard").style.display = "none";
    document.getElementById("handcashHandleQR").style.display = "none";
  };
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
