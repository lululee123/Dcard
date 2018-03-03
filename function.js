function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("任務不能為空！！");
  } else {
    $("#myUL").append('<li><span>' + $("#myInput").val() + '</span> <small><a href="#edit">Edit</a>  <a href="#delete">Delete</a></small></li>');
    // clear the text
  }
  $("#myInput").val("");
};

// on clicking the add button
$("#add").click(newElement);
// delegate the events to dynamically generated elements
// for the edit button
$(document).on("click", 'a[href="#edit"]', function () {
  // make the span editable and focus it
  $(this).closest("li").find("span").prop("contenteditable", true).focus();
  return false;
});
// for the delete button
$(document).on("click", 'a[href="#delete"]', function () {
  // remove the list item
  $(this).closest("li").fadeOut(function () {
    $(this).remove();
  });
  return false;
});

function doneFilter() {
 $("li").css('display','none');
 $("li.checked").css('display','block');
}

function notDoneFilter() {
 $("li").css('display','block');
 $("li.checked").css('display','none');
}

function noFilter() {
  $("li").css('display','block');
}





/*  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    //document.getElementById("myUL").appendChild(li).setAttribute("contentEditable", true);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  li.appendChild(span).setAttribute("contentEditable", false)

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("edit");
  span.className = "edit";
  span.appendChild(txt);
  li.appendChild(span);
  li.appendChild(span).setAttribute("contentEditable", false)


  var close = document.getElementsByClassName("close");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.remove();
    }
  }
}*/
