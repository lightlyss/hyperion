(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n.n(i),s=n(8),r=n.n(s),a=n(2),l=n(3),c=n(5),h=n(4),m=n(6),d=n(0),p=n(9),u=n(10),w=function(e){function t(){var e,n;Object(a.a)(this,t);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(n=Object(c.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).animate=function(){n.renderScene(),n.frameId=window.requestAnimationFrame(n.animate)},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=document.createElement("script");t.src="js/ammo.js",t.async=!0,t.onload=function(){window.Ammo().then(function(t){window.Ammo=t,e.loadThree(),e.animate()})},document.body.appendChild(t)}},{key:"loadThree",value:function(){var e=this,t=this.mount.clientWidth,n=this.mount.clientHeight;this.modelUrl="pmx/".concat(this.props.model,"/model.pmx"),this.motionUrls=this.props.motions.map(function(e){return"vmd/".concat(e,".vmd")}),this.clock=new d.i,this.camera=new d.I(45,t/n,1,2e3),this.camera.position.z=30,this.scene=new d.N,this.scene.background=new d.j(16777215),this.gridHelper=new d.J(30,10),this.gridHelper.position.y=-10,this.scene.add(this.gridHelper),this.ambient=new d.b(6710886),this.scene.add(this.ambient),this.directionalLight=new d.n(8943462),this.directionalLight.position.set(-1,1,1).normalize(),this.scene.add(this.directionalLight),this.renderer=new d.Y({antialias:!0}),this.renderer.setClearColor("#000000"),this.renderer.setSize(t,n),this.mount.appendChild(this.renderer.domElement),this.helper=new u.a({afterglow:2}),this.loader=new p.a,this.loader.loadWithAnimation(this.modelUrl,this.motionUrls,function(t){e.mesh=t.mesh,e.mesh.position.x=e.props.modelX||0,e.mesh.position.y=e.props.modelY||-10,e.mesh.position.z=e.props.modelZ||0,e.scene.add(e.mesh),e.helper.add(e.mesh,{animation:t.animation,physics:!0}),e.ikHelper=e.helper.objects.get(e.mesh).ikSolver.createHelper(),e.ikHelper.visible=!1,e.scene.add(e.ikHelper),e.physicsHelper=e.helper.objects.get(e.mesh).physics.createHelper(),e.physicsHelper.visible=!1,e.scene.add(e.physicsHelper),e.start()},function(){return null},null)}},{key:"componentWillUnmount",value:function(){this.stop(),this.mount.removeChild(this.renderer.domElement)}},{key:"start",value:function(){this.frameId||(this.frameId=requestAnimationFrame(this.animate))}},{key:"stop",value:function(){cancelAnimationFrame(this.frameId)}},{key:"renderScene",value:function(){this.helper.update(this.clock.getDelta()),this.renderer.render(this.scene,this.camera)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:{width:"800px",height:"600px",padding:"0",margin:"auto"},ref:function(t){e.mount=t}})}}]),t}(o.a.Component),f=function(e){function t(){return Object(a.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return"liliya"===this.props.model?o.a.createElement(w,{model:"liliya",motions:["wavefile"]}):"seele"===this.props.model?o.a.createElement(w,{model:"seele",motions:["senbonzakura"]}):o.a.createElement(w,{model:"wendy",motions:["sweetmagic-lip","sweetmagic-left"],modelX:10})}}]),t}(o.a.Component),y=(n(17),new URLSearchParams(window.location.search));r.a.render(o.a.createElement(f,{model:y.get("model")}),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.45578055.chunk.js.map