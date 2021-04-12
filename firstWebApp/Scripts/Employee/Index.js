//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Employee/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.EmpId + '</td>';
                html += '<td>' + item.EmpName + '</td>';
                //html += '<td>' + item.Password + '</td>';
                html += '<td>' + item.EmpSalary + '</td>';
                html += '<td>' + item.TDS + '</td>';
                html += '<td>' + item.NetSalary + '</td>';
                html += '<td>' + formatDate(item.JoiningDate) + '</td>';
                html += '<td><a href="#" class="edit" empid="' + item.EmpId + '">Edit</a> | <a href="#" class="delete" empid="' + item.EmpId + '">Delete</a></td>'; html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmpId: '',
        EmpName: $('#EmpName').val(),
        Password: '',
        EmpSalary: $('#EmpSalary').val(),
        TDS: (($('#EmpSalary').val()) * 0.10),
        NetSalary: (($('#EmpSalary').val()) - (($('#EmpSalary').val()) * 0.10)),
        JoiningDate: $('#JoiningDate').val()
    };
    $.ajax({
        url: "/Employee/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(EmpId) {
    $('#EmpName').css('border-color', 'lightgrey');
    $('#EmpSalary').css('border-color', 'lightgrey');
    $('#JoiningDate').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Employee/getbyID/" + EmpId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#btnUpdate').attr('empid', result.EmpId);
            $('#EmpName').val(result.EmpName);
            $('#EmpSalary').val(result.EmpSalary);
            var dateFormatted = formatDate(result.JoiningDate);
            $('#JoiningDate').val(dateFormatted);

            $('#myModal').show();
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmpId: $('#btnUpdate').attr('empid'),
        EmpName: $('#EmpName').val(),
        Password: '',
        EmpSalary: $('#EmpSalary').val(),
        TDS: (($('#EmpSalary').val()) * 0.10),
        NetSalary: (($('#EmpSalary').val()) - (($('#EmpSalary').val()) * 0.10)),
        JoiningDate: $('#JoiningDate').val()
    };
    $.ajax({
        url: "/Employee/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#EmpName').val("");
            $('#EmpSalary').val("");
            $('#JoiningDate').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Employee/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#EmpName').val("");
    $('#EmpSalary').val("");
    $('#JoiningDate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#EmpName').css('border-color', 'lightgrey');
    $('#EmpSalary').css('border-color', 'lightgrey');
    $('#JoiningDate').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#EmpName').val().trim() == "") {
        $('#EmpName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmpName').css('border-color', 'lightgrey');
    }
    if ($('#EmpSalary').val().trim() == "") {
        $('#EmpSalary').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmpSalary').css('border-color', 'lightgrey');
    }
    if ($('#JoiningDate').val().trim() == "") {
        $('#JoiningDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#JoiningDate').css('border-color', 'lightgrey');
    }
    return isValid;
}  
//click events
$(document).on('click', '.edit', function (event) {
    getbyID($(this).attr('empid'));
});
$(document).on('click', '.delete', function (event) {
    Delete($(this).attr('empid'));
});

//date formatter for datepicker
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}