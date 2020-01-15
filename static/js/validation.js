function validate(){
  var presentValue= document.getElementById('presentValue').value;
  var investmentValue = document.getElementById('investmentValue').value;
  var horizon= document.getElementById('horizon').value;
  var pvRegex = [1-9][0-9]{2,};
  var ivRegex = [1-9][0-9]{2,};
  var timeRegex= \b([1-9]|[0-4][0-5])\b;
  var pvResult = pvRegex.test(presentValue);
  var ivResult = ivRegex.test(investmentValue);
  var horResult= timeRegex.test(horizon);
if(pvResult == false)
{
alert('Please enter a whole number greater than 1');
return false;
}

if(ivResult == false)
{
alert('Please enter a whole number greater than 1');
return false;
}

if(horResult == false)
{
alert('Please enter a whole number between 1 and 45');
return false;
}

  return true;
}