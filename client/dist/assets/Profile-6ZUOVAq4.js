import{r as h,o as b,p as y,u as x,n as e,q as R,s as U,t as I,I as q,_ as r,v as i,w as D,x as E}from"./index-b7hO_5i4.js";const F=()=>{let o,c,d,n,m,f=h.useRef(),N=b();h.useEffect(()=>{(async()=>await y())()},[]);const s=x(a=>a.user.value),j=x(a=>a.user.profilePic),v=async a=>{await R(a.target.files[0]).then(t=>{f.src=t});const l=new FormData;l.append("file",a.target.files[0]),U.dispatch(I(l))},w=async()=>{let a=o.value,l=c.value,t=d.value,u=n.value,p=m.value;if(!q(a))r.error("Valid Email Address Required!");else if(i(l))r.error("First Name Required!");else if(i(t))r.error("Last Name Required!");else if(i(u))r.error("Mobile Number Required!");else if(i(p))r.error("A Strong Password Required!");else{let g=await D(a,l,t,u,p),P=await E(j);g===!0&&P===!0&&N("/")}};return e.jsx("div",{className:"container",children:e.jsx("div",{className:"row d-flex justify-content-center",children:e.jsx("div",{className:"col-md-12",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"container-fluid",children:[e.jsx("img",{ref:a=>f=a,className:"icon-nav-img-lg",src:s.photo===""?"https://image.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg":s.photo,alt:""}),e.jsx("hr",{}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-4 p-2",children:[e.jsx("label",{htmlFor:"file",children:"Change Profile Picture"}),e.jsx("input",{id:"file",name:"file",onChange:v,placeholder:"Change Profile Picture",className:"form-control animated fadeInUp",type:"file"})]}),e.jsxs("div",{className:"col-4 p-2",children:[e.jsx("label",{children:"Email Address"}),e.jsx("input",{defaultValue:s.email,readOnly:!0,ref:a=>o=a,placeholder:"User Email",className:"form-control animated fadeInUp",type:"email"},Date.now())]}),e.jsxs("div",{className:"col-4 p-2",children:[e.jsx("label",{children:"First Name"}),e.jsx("input",{defaultValue:s.firstName,ref:a=>c=a,placeholder:"First Name",className:"form-control animated fadeInUp",type:"text"},Date.now())]}),e.jsxs("div",{className:"col-4 p-2",children:[e.jsx("label",{children:"Last Name"}),e.jsx("input",{defaultValue:s.lastName,ref:a=>d=a,placeholder:"Last Name",className:"form-control animated fadeInUp",type:"text"},Date.now())]}),e.jsxs("div",{className:"col-4 p-2",children:[e.jsx("label",{children:"Mobile"}),e.jsx("input",{defaultValue:s.mobile,ref:a=>n=a,placeholder:"Mobile",className:"form-control animated fadeInUp",type:"mobile"},Date.now())]}),e.jsxs("div",{className:"col-4 p-2",children:[e.jsx("label",{children:"Password"}),e.jsx("input",{defaultValue:s.password,ref:a=>m=a,placeholder:"User Password",className:"form-control animated fadeInUp",type:"password"},Date.now())]}),e.jsx("div",{className:"col-4 p-2",children:e.jsx("button",{onClick:w,className:"w-100  btn btn-success",children:"Update"})})]})]})})})})})})};export{F as default};
