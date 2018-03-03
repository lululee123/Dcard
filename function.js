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
