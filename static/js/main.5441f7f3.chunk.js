(this["webpackJsonpplanetario-3d"]=this["webpackJsonpplanetario-3d"]||[]).push([[0],{12:function(e,t,n){e.exports=n(25)},19:function(e,t,n){},20:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n.n(a),i=n(10),s=n.n(i),r=(n(19),n(1)),c=n(27),l=n(11);n(20);const d=e=>{let{planet:t}=e;return t?o.a.createElement("div",{className:"planet-info"},o.a.createElement("h2",null,t.name),o.a.createElement("p",null,o.a.createElement("strong",null,"Di\xe1metro:")," ",t.realDiameter," km"),o.a.createElement("p",null,o.a.createElement("strong",null,"Distancia al Sol:")," ",t.realDistance," millones de km"),t.composition&&o.a.createElement("p",null,o.a.createElement("strong",null,"Composici\xf3n:")," ",t.composition)):o.a.createElement("div",{className:"planet-info"},"Haz clic en un planeta para ver la informaci\xf3n")},u={mercurio:{a:.387,e:.205,I:7,L:252.25,"\u03c9":77.45,"\u03a9":48.33,texture:"texturamercurio.jpg",size:.3,realDiameter:4879,realDistance:57.9,composition:"Mercurio est\xe1 compuesto principalmente de metales (70% hierro) y silicatos (30%). Tiene un gran n\xfacleo de hierro."},venus:{a:.723,e:.007,I:3.39,L:181.98,"\u03c9":131.53,"\u03a9":76.68,texture:"texturavenus.jpg",size:1,realDiameter:12104,realDistance:108.2,composition:"Venus tiene un n\xfacleo de hierro, un manto de silicatos y una atm\xf3sfera densa de CO2 (96.5%) y nitr\xf3geno (3.5%)."},tierra:{a:1,e:.017,I:0,L:100.46,"\u03c9":102.94,"\u03a9":0,texture:"texturatierra.jpg",size:1.25,realDiameter:12742,realDistance:149.6,composition:"La Tierra tiene un n\xfacleo de hierro y n\xedquel, manto de silicatos y una atm\xf3sfera de nitr\xf3geno (78%) y ox\xedgeno (21%)."},marte:{a:1.524,e:.093,I:1.85,L:355.45,"\u03c9":336.04,"\u03a9":49.56,texture:"texturamarte.jpg",size:.75,realDiameter:6779,realDistance:227.9,composition:"Marte tiene un n\xfacleo de hierro y n\xedquel, y una superficie bas\xe1ltica. Su atm\xf3sfera es de CO2 (95%)."},jupiter:{a:5.203,e:.048,I:1.3,L:34.4,"\u03c9":14.73,"\u03a9":100.56,texture:"texturajupiter.jpg",size:3,realDiameter:139820,realDistance:778.5,composition:"J\xfapiter est\xe1 compuesto de hidr\xf3geno (90%) y helio (10%). Su interior contiene hidr\xf3geno met\xe1lico y un peque\xf1o n\xfacleo rocoso."},saturno:{a:9.537,e:.056,I:2.49,L:49.94,"\u03c9":92.86,"\u03a9":113.64,texture:"texturasaturno.jpg",size:2.5,realDiameter:116460,realDistance:1434,composition:"Saturno est\xe1 compuesto principalmente de hidr\xf3geno (96%) y helio (3%). Al igual que J\xfapiter, tiene un peque\xf1o n\xfacleo rocoso."},urano:{a:19.191,e:.046,I:.77,L:313.23,"\u03c9":170.96,"\u03a9":74,texture:"texturaurano.jpg",size:2,realDiameter:50724,realDistance:2871,composition:'Urano contiene hidr\xf3geno, helio y "hielos" como agua, amon\xedaco y metano, que le dan su color azul verdoso.'},neptuno:{a:30.068,e:.01,I:1.77,L:304.88,"\u03c9":44.97,"\u03a9":131.79,texture:"texturaneptuno.jpg",size:1.75,realDiameter:49244,realDistance:4495,composition:'Neptuno tiene hidr\xf3geno, helio y "hielos" como agua, amon\xedaco y metano. Su color azul profundo se debe al metano.'}},m=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e-6,a=e,o=1;for(;Math.abs(o)>n;)o=(e-(a-t*Math.sin(a)))/(1-t*Math.cos(a)),a+=o;return a},h=(e,t,n,a,o,i,s)=>{const c=(i-a+s/36525*360)%360,l=r.g.degToRad(c),d=m(l,t),u=e*(Math.cos(d)-t),h=e*Math.sqrt(1-t*t)*Math.sin(d);return{x:(Math.cos(o)*Math.cos(a)-Math.sin(o)*Math.sin(a)*Math.cos(n))*u+(-Math.cos(o)*Math.sin(a)-Math.sin(o)*Math.cos(a)*Math.cos(n))*h,y:(Math.sin(o)*Math.cos(a)+Math.cos(o)*Math.sin(a)*Math.cos(n))*u+(-Math.sin(o)*Math.sin(a)+Math.cos(o)*Math.cos(a)*Math.cos(n))*h,z:Math.sin(a)*Math.sin(n)*u+Math.cos(a)*Math.sin(n)*h}},p=(e,t,n,a,o,i)=>{const s=new r.q(2.5*t,32,32),c=(new r.t).load("/DamianMillan/Spaceapps.git/"+a),l=new r.j({map:c,shininess:100}),d=new r.h(s,l),u=h(o.a,o.e,r.g.degToRad(o.I),r.g.degToRad(o.\u03c9),r.g.degToRad(o.\u03a9),o.L,i);d.position.set(u.x*n,u.y*n,u.z*n),d.name=e,d.size=t,d.distance=n;return{planet:d,orbitLine:((e,t,n,a,o,i,s,c)=>{const l=[];for(let h=0;h<=360;h++){const c=(i+h)%360,d=r.g.degToRad(c),u=m(d,t),p=e*(Math.cos(u)-t),g=e*Math.sqrt(1-t*t)*Math.sin(u),M=(Math.cos(o)*Math.cos(a)-Math.sin(o)*Math.sin(a)*Math.cos(n))*p+(-Math.cos(o)*Math.sin(a)-Math.sin(o)*Math.cos(a)*Math.cos(n))*g,w=(Math.sin(o)*Math.cos(a)+Math.cos(o)*Math.sin(a)*Math.cos(n))*p+(-Math.sin(o)*Math.sin(a)+Math.cos(o)*Math.cos(a)*Math.cos(n))*g,y=Math.sin(a)*Math.sin(n)*p+Math.cos(a)*Math.sin(n)*g;l.push(new r.v(M*s,w*s,y*s))}const d=(new r.b).setFromPoints(l),u=new r.e({color:16777215});return new r.d(d,u)})(o.a,o.e,r.g.degToRad(o.I),r.g.degToRad(o.\u03c9),r.g.degToRad(o.\u03a9),o.L,n)}};var g=()=>{const[e,t]=Object(a.useState)(null),[n,i]=Object(a.useState)([]),[s,m]=Object(a.useState)([]),[g,M]=Object(a.useState)(null);Object(a.useEffect)(()=>{const e=new r.p,n=new r.k(60,window.innerWidth/window.innerHeight,.1,5e3);n.position.z=300,M(n);const a=new r.w;a.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(a.domElement);const o=new l.a(n,a.domElement);o.enableDamping=!0,o.dampingFactor=.05,o.enableZoom=!0;const d=new r.a(16777215,4);e.add(d);const g=[],w=(new r.t).load("/DamianMillan/Spaceapps.git/texturasol.jpg"),y=new r.q(15,32,32),E=new r.j({map:w,shininess:150}),b=new r.h(y,E);e.add(b);let x=2451545;Object.keys(u).forEach(t=>{const n=u[t],{planet:a,orbitLine:o}=p(t,n.size,50,n.texture,n,x);e.add(a),e.add(o),g.push(a)}),i(g);(async()=>{try{const t=(await c.a.get("https://data.nasa.gov/resource/b67r-rgxc.json")).data,n=[];t.forEach(t=>{if(t.tp_tdb&&t.q_au_1){const a=function(e,t,n){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.3,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:16777215;const i=new r.q(a,32,32),s=new r.i({color:o}),c=new r.h(i,s),l=h(parseFloat(t.q_au_1),parseFloat(t.e),r.g.degToRad(parseFloat(t.i_deg)),r.g.degToRad(parseFloat(t.w_deg)),r.g.degToRad(parseFloat(t.node_deg)),parseFloat(t.tp_tdb),2451545);return c.position.set(100*l.x,100*l.y,100*l.z),c.name=e,c.composition=n,c}(t.object,t,t.composition||"Desconocida");e.add(a),n.push(a)}}),m(n)}catch(t){console.error("Error al obtener los datos de cometas",t)}})();const v=new r.o,f=new r.u,j=e=>{f.x=e.clientX/window.innerWidth*2-1,f.y=-e.clientY/window.innerHeight*2+1,v.setFromCamera(f,n);const t=v.intersectObjects([...g,...s]);document.body.style.cursor=t.length>0?"pointer":"default"},D=e=>{v.setFromCamera(f,n);const a=v.intersectObjects(g);if(a.length>0){const e=a[0].object.name,n=u[e];n&&t({...n,name:e})}};window.addEventListener("mousemove",j),window.addEventListener("click",D);const z=()=>{requestAnimationFrame(z),o.update(),x+=20,g.forEach(e=>{const t=u[e.name],n=h(t.a,t.e,r.g.degToRad(t.I),r.g.degToRad(t.\u03c9),r.g.degToRad(t.\u03a9),t.L,x);e.position.set(n.x*e.distance,n.y*e.distance,n.z*e.distance)}),a.render(e,n)};return z(),()=>{document.body.removeChild(a.domElement),window.removeEventListener("mousemove",j),window.removeEventListener("click",D)}},[]);return o.a.createElement("div",null,o.a.createElement("div",{className:"planet-menu"},o.a.createElement("h2",null,"Planetas"),o.a.createElement("ul",null,n.map(e=>o.a.createElement("li",{key:e.name,onClick:()=>(e=>{if(g&&e){const t=e.size,n=6,a="jupiter"===e.name?t*n-20:t*n-10,o=(new r.v).subVectors(new r.v(0,0,0),e.position).normalize();g.position.set(e.position.x+o.x*a,e.position.y+o.y*a,e.position.z+o.z*a),g.lookAt(e.position),g.updateProjectionMatrix()}})(e)},e.name)))),o.a.createElement(d,{planet:e}))};var M=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,28)).then(t=>{let{getCLS:n,getFID:a,getFCP:o,getLCP:i,getTTFB:s}=t;n(e),a(e),o(e),i(e),s(e)})};s.a.createRoot(document.getElementById("root")).render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(g,null))),M()}},[[12,1,2]]]);
//# sourceMappingURL=main.5441f7f3.chunk.js.map