const HandcashUrl = "https://api.handcash.io/api/receivingAddress/";

async function getHandcashHandle(handleId){
  var handle = document.getElementById(handleId).value
  if (handle.startsWith("$")){
    handle = handle.substr(1);
  }
  var url = HandcashUrl + handle;
  const response = await fetch(url, {});
  const handcashHandle = await response.json();
  // console.log(handcashHandle.receivingAddress);
  document.getElementById("handle").innerHTML = "$" + handle;
  document.getElementById("handcashHandleAddress").innerHTML = handcashHandle.receivingAddress;
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
