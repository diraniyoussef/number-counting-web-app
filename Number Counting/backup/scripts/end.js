$(document).ready(function(event){ 
	$('label input').val("");
});

////unavailability notification of French and Arabic services.
//it is display: none at first, then here it is shown, delayed, then hidden (thus back displayed to none.)
$('#language_pos a:nth-of-type(2)').click(function(){
	$('#language-unavailable').css({
		'top': '1em'		
	});
	$('#language-unavailable').show(0, function(){$('#language-unavailable').delay(1000).hide(0);});
});
$('#language_pos a:nth-of-type(3)').click(function(){
	$('#language-unavailable').css({
		'top': '5.3em'		
	});
	$('#language-unavailable').show(0, function(){$('#language-unavailable').delay(1000).hide(0);});
});

////determining the simple count of hundreds
var hundredsCount = function(){
	var hundreds = $('input[name="hundreds"]').val();
if (!((hundreds==0) || (hundreds==1) || (hundreds==2) || (hundreds==3) || (hundreds==4) || (hundreds==5) || (hundreds==6) || (hundreds==7) || (hundreds==8) || (hundreds==9))){
		//don't do anything if a value was not a digit
	}else{
		if (hundreds==""){
			hundreds = 0;//if a value was deleted delete all the countable hundreds if any
		}
		if (!(hundreds==0) && $('label:nth-of-type(3) input').val()==""){//if the ones was empty while we put a considerable value for hundreds
			$('label:nth-of-type(3) input').val(0);
		}
		if (!(hundreds==0) && $('label:nth-of-type(2) input').val()==""){//if the tens was empty while we put a considerable value for hundreds
			$('label:nth-of-type(2) input').val(0);
		}
		var b = "table:nth-of-type(";
		for (j=1; j<= hundreds; j++){//maximum value of hundreds is 9 
			var c = b.concat(j.toString(),")");
			$(c).css('visibility','visible');
		}
		for (j; j<= 9; j++){//there will always be an entrance here since the maximum value of hundreds is 9, so there will never be 10 columns of 10's.
			c = b.concat(j.toString(),")");
			$(c).css('visibility','hidden');
		}
	}
}
$('input[name="hundreds"]').change(hundredsCount);/*This is an argument passed*/

////determining the simple count of tens
var tensCount = function(){
	var tens = $('input[name="tens"]').val();
if (!((tens==0) || (tens==1) || (tens==2) || (tens==3) || (tens==4) || (tens==5) || (tens==6) || (tens==7) || (tens==8) || (tens==9))){
		//don't do anything if a value was not a digit
	}else{
		if (tens==""){//if a value was deleted delete all countable tens if any
			tens = 0;
		}
		if (!(tens==0) && $('label:nth-of-type(3) input').val()===""){//if the ones was empty while we put a considerable value for tens
			$('label:nth-of-type(3) input').val(0);
		}
		var b = "table:nth-of-type(";
		for (j=10; j<= 9 + parseInt(tens); j++){//maximum value of tens is 9 
			var c = b.concat(j.toString(),")");
			$(c).css('visibility','visible');
		}
		for (j; j<= 19; j++){//there will always be an entrance here since the maximum value of tens is 9, so there will never be 10 columns of 10's.
			c = b.concat(j.toString(),")");
			$(c).css('visibility','hidden');
		}
	}
}
$('input[name="tens"]').change(tensCount);

////determining the simple count of ones
var onesCount = function(){
	var ones = $('input[name="ones"]').val();
if (!((ones==0) || (ones==1) || (ones==2) || (ones==3) || (ones==4) || (ones==5) || (ones==6) || (ones==7) || (ones==8) || (ones==9))){
		//don't do anything if a value was not a digit
	}else{
		if (ones==""){
			ones = 0; //if a value was emptied delete all ones if any
		}
		var a = ".tensones ";
		for (i=1; i<= ones; i++){
			a = a.concat("+ div ");
			$(a).css('visibility','visible');
		}
		for (i; i<= 10; i++){
			a = a.concat("+ div ");
			$(a).css('visibility','hidden');
		}
	}
}
$('input[name="ones"]').change(onesCount);

var NumberPresent = function(ones, tens, hundreds){/*Checking to have a value for ones*/
	if (ones==0 || ones==1 || ones==2 || ones==3 || ones==4 || ones==5 || ones==6 || ones==7 || ones==8 || ones==9){
		if ($('input[name="tens"]').val()=="" || tens==0 || tens==1 || tens==2 || tens==3 || tens==4 || tens==5 || tens==6 || tens==7 || tens==8 || tens==9){
			if ($('input[name="hundreds"]').val()=="" || hundreds==0 || hundreds==1 || hundreds==2 || hundreds==3 || hundreds==4 || hundreds==5 || hundreds==6 || hundreds==7 || hundreds==8 || hundreds==9){
				return(true);
			}else{
				return(false);									
			}
		}
	}
}

$('#plus-one').click(function(){
	var ones = parseInt($('input[name="ones"]').val());
	var tens = parseInt($('input[name="tens"]').val());
	/*parseInt is important because a letter has the value of 0 as well - this makes some non-sense effects*/
	var hundreds = parseInt($('input[name="hundreds"]').val());
	if (!NumberPresent(ones, tens, hundreds)){
		return;
	};
	if (ones < 9){/*We already checked that there will be a value for ones*/
		$('input[name="ones"]').val(ones + 1);
		onesCount();
	}
	if (ones==9 && tens==9 && hundreds==9){
		return;
	}
	
	/*	$('input[name="fake-tens"]').val("7");
	$('input[name="tens"]').css('opacity','0.1');
	$('input[name="tens"]').css('z-index','1');
	$('input[name="fake-tens"]').css('z-index','0');
	alert($('input[name="tens"]').css('z-index'));*/
})
$('#minus-one').click(function(){
	var ones = parseInt($('input[name="ones"]').val());
	var tens = parseInt($('input[name="tens"]').val());
	/*parseInt is important because a letter has the value of 0 as well - this makes some non-sense effects*/
	var hundreds = parseInt($('input[name="hundreds"]').val());
	if (!NumberPresent(ones, tens, hundreds)){
		return;
	};
	if (ones > 0){/*We already checked that there will be a value for ones*/
		$('input[name="ones"]').val(ones - 1);
		onesCount();
	}
	if ((hundreds==0 || parseInt($('input[name="hundreds"]').val())=="") && (tens==0 || parseInt($('input[name="tens"]').val()=="")) && ones==0){
		return;
	}
})