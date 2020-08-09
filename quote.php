<?php
	if(isset($_POST['submit'])){
		$name=$_POST['Name'];
		$phone=$_POST['Phone'];
		$email=$_POST['Email'];
		$msg=$_POST['Message'];

		$to='kkumarsatyanshu2107@gmail.com';
		$subject='Form Submission';
		$message="Name: " .$name. "\n" ."Phone_Number: ". "\n".$phone. "Wrote the following: ". "\n\n".$msg;
		$headers="From: ".$email;


		if(mail($to, $Subject, $message, $headers)){
			echo "<h1>Sent Successfully! Thank You!"."\n".$name."</h1>";
		}
		else{
			echo "Something went wrong!";
		}
	}
?>