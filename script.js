$(document).ready(function() {
  const wsUri = "ws://localhost:9000/index.php";
  websocket = new WebSocket(wsUri);

  websocket.addEventListener("open", function(ev) {
    $("#message_box").append(`<div class="system_msg">Connected!</div>`);
  });

  // Button Click function
  $("#send-btn").click(function() {
    const myMessage = $("#message").val();
    const myName = $("#name").val();

    if (!myName) {
      alert("Enter your name Pleased");
      return;
    }

    if (!myMessage) {
      alert("Enter some message Please!");
    }

    // Prepare JSON data
    const msg = {
      message: myMessage,
      name: myName,
      color: "<?php echo $colours[$user_colour]; ?>"
    };

    // Convert and Send data to server
    websocket.send(JSON.stringify(msg));

    // Message received from server ?
    websocket.onmessage = function(ev) {
      const msg = JSON.parse(ev.data);
      const type = msg.type;
      const umsg = msg.message;
      const uname = msg.name;
      const ucolor = msg.color;

      if (type == "usermsg") {
        $("#message_box").append(
          `<div><span class="user_name" style="color:${ucolor}`
        );
      }
    };

    websocket.onerror = function(ev) {
      $("#message_box").append(
        `<div class="system_error>Error Occured - ${ev.data}</div>`
      );
    };

    websocket.onclose = function(ev) {
      $("message_box").append(
        `<div class="system_msg">Connection Closed</div>`
      );
    };
  });
});
