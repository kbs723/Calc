		let click=false;
		let operant1='';
		let operant2='';
		let operator='';
		// function hover(){
		// 	document.getElementById("Calc").style.overflow="auto";
		// }
		// function hoverout(){
		// 	setTimeout(5000);
		// 	document.getElementById("Calc").style.overflow="hidden";
		// }
		function viewport(){
			if(operant1==''){
				operator='';
				document.getElementById('display').innerText='0';
				return;
			}
			document.getElementById('display').innerText=operant1+operator+operant2;
		}

		let op1Dot =false;
		let op2Dot =false;
		function dis(str) {
			console.log("Entered ",str);
			if(operator=='' || operant1==''){
				operant1+=str;
				console.log("operant1 ",operant1);
				document.getElementById("toptext").innerText=operant1;
				viewport();
				return;
			}
			operant2+=str;
			console.log("operant2 ",operant2);
			// operant1 +" "+operator+" "+operant2+" = "+
			document.getElementById("toptext").innerText=eval(operant1+operator+operant2).toFixed(2);
			viewport();
		}
		function disDot(){
			if(operant2=='' && operator=='' && !op1Dot && operant1==''){
				dis('0.');
				op1Dot=true;
			}
			else if(operant2=='' && operator=='' && !op1Dot && operant1!=''){
				dis('.');
				op1Dot=true;
			}
			else if(operant2=='' && !op2Dot && op1Dot && operator!=''){
				dis('0.');
				op2Dot=true;
			}
			else if(!op2Dot && op1Dot && operator!=''){
				dis('.');
				op2Dot=true;
			}
		}

		function beforePoint(){
			if(operant1!='' && operator!='' && !op2Dot){
				operant2='0.'+operant2;
				op2Dot = true;
			}
			else if(!op1Dot){
				operant1='0.'+operant1;
				op1Dot = true;
			}
			viewport();
		}
		function controls(oper){
			if(operator!=''){
				ans_display();
			}
			control(oper);
		}
		function backspace(){
			if(operator==''){
				var len=operant1.length;
				var laststr = operant1.slice(len-1);
				if(laststr=='.'){
					op1Dot = false;
				}
				operant1=operant1.substring(0,len-1);
				if(len==1){
					viewport();
					return;
				}
			}
			else if(operant2==''){
				operator='';
			}
			else{
				var len=operant2.length;
				var laststr = operant2.slice(len-1);
				if(laststr=='.'){
					op2Dot = false;
				}
				operant2=operant2.substring(0,len-1);
			}
			if(operant2!=''){
				document.getElementById("toptext").innerText=eval(operant1+operator+operant2).toFixed(2);
			}
			else{
				document.getElementById("toptext").innerText=operant1;
			}
			viewport();
		}
		function control(str){
			console.log("operator ",operator);
			if(str=='C'){
				operator='';
				operant2='';
				operant1='';
				op1Dot=false;
				op2Dot=false;
				document.getElementById("toptext").innerText='';
				document.getElementById('display').innerText='0';
				return;
			}
			else if(str=='sq' || str=='sqrt' || str=='neg' || str=='fraction'){
				operator=str;
				ans_display();
				return;
			}
			else{
				operator=str;
			}
			viewport();
		}
		
		function ans_display() {
			op1=parseInt(operant1);
			op2=parseInt(operant2);
			let ans=op1;
			if(operant1 !='' && operant2 !='' && operator!=''){
				ans=eval(operant1+operator+operant2);
			}
			else if(operant1 !='' && operator !=''){
				if(operator=='fraction'){
					ans=eval("1/op1").toFixed(7);
				}
				else if(operator=='sq'){
					ans=eval("op1**2");
				}
				else if(operator=='neg'){
					ans=eval("-1*op1");
				}
				else if(operator=='sqrt'){
					ans=Math.sqrt(operant1);
				}
				else if(operator=='CE'){
					control('CE');
				}
				else {
					control('C');
				}
			}
			else if(operant1 =='' && operator !=''){
				if(operator=='fraction'){
					ans=eval("1/0");
				}
				else if(operator=='sq'){
					ans=eval("0**2");
				}
				else if(operator=='neg'){
					ans=eval("0 * (-1)");
				}
				else if(operator=='sqrt'){
					ans=Math.sqrt(0);
				}
				else if(operator=='CE'){
					control('CE');
				}
				else {
					control('C');
				}
			}
			const his_li = document.getElementById("his_list");

			//datelist
			let d = new Date();
			let date_list = document.createElement("li");
			var hour = d.getHours() > 12 ? d.getHours()-12 : d.getHours();
			hour= (hour==0) ? 12:hour;
			var am_pm = d.getHours() >= 12 ? "PM" : "AM";
			date_list.innerHTML=`<span>${d.getDate()} / ${d.getMonth()} / ${d.getFullYear()} \xa0\xa0\xa0\xa0\xa0 ${hour} \xa0:\xa0 ${d.getMinutes()} \xa0${am_pm} </span>
			<span> <button class="editBut" onclick="editHis(event)"><i class="fa-solid fa-pencil"></i> </button>
			<button onclick="delHis(event)" class="delBut">x</button></span>`;
			date_list.setAttribute("class","dateList");
			
			//ul List recents
			let list = document.createElement("li");
			list.setAttribute("class","ulList");
			list.setAttribute("onmouseover","hover(event)");
			list.setAttribute("onmouseout","hoverout(event)");
			list.innerHTML = `<span class="opHis">${operant1}</span> 
			<span class="operatorHis">${operator}</span>
			<span class="opHis">${operant2}</span>
			<span class="ansHis"> \xa0=\xa0 ${ans}</span>`;

			//toptext
			document.getElementById("toptext").innerText=operant1+" "+operator+" "+operant2+" = ";
			
			//append
			list.insertBefore(date_list,list.children[0]);
			his_li.insertBefore(list,his_li.children[0]);

			//display
			console.log(ans);
			document.getElementById('display').innerText=ans;
			operant1=ans.toString();
			operator='';
			operant2='';	
		}
		function delHis(event){
			let parentone = event.target.parentNode.parentNode.parentNode;
			if(parentone){
				parentone.remove();
			}
		}
		function editHis(event){
			let parenttwo = event.target.parentNode.parentNode.parentNode.parentNode;
			var spant = parenttwo.children[1];
			operant1 = spant.textContent;
			spant = parenttwo.children[2];
			operator = spant.textContent;
			spant = parenttwo.children[3];
			operant2 = spant.textContent;
			console.log(operant1);
			viewport();
			
		}
		function recent(){
			if(click){
				document.getElementById('num-pad').style.display='flex';
				document.getElementById('hide').style.display='none';
				document.getElementById('name').innerText='CALC';
				document.getElementById('recent').innerHTML='<i class="fa-solid fa-clock-rotate-left"></i>';
				click=false;
				return;
			}
			document.getElementById('num-pad').style.display='none';
			document.getElementById('hide').style.display='flex';
			document.getElementById('name').innerText='HISTORY';
			document.getElementById('recent').innerHTML='<i class="fa-solid fa-house"></i>';
			click=true;
		}
