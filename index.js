'use strict'

const width  = window.innerWidth,
      height = window.innerHeight

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
renderer.setSize(width, height)
renderer.setClearColor(new THREE.Color(0xffffff), 0.0)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 3000)
camera.position.set(0, 0, -2500)


var light1 = new THREE.DirectionalLight(0xffffff, 0.5)
light1.position.set(0, 0, 50)
scene.add(light1)

var light2 = new THREE.DirectionalLight(0xffffff, 0.5)
light2.position.set(0, 0, -50)
scene.add(light2)

var light3 = new THREE.DirectionalLight(0xffffff, 0.2)
light3.position.set(50, 0, 0)
scene.add(light3)

const light  = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)

const controls = new THREE.OrbitControls(camera, renderer.domElement)

const windmillClock = new THREE.Clock()
let mixer, mixerWindmill

const loader = new THREE.GLTFLoader()
loader.load('./trex/trex_running.gltf', (data) => {
  const object = data.scene
  const animations = data.animations
  if (animations && animations.length) {
    mixerWindmill = new THREE.AnimationMixer(object)
    for (let i = 0; i < animations.length; i++)
      mixerWindmill.clipAction(animations[i]).play()
  }
  object.rotation.y = -60
  object.position.set(0, -200, 0)
  scene.add(object)
})

const clock = new THREE.Clock()

const animation = () => {
  renderer.render(scene, camera)
  controls.update()
  if(mixer) mixer.update(clock.getDelta())
  if(mixerWindmill) mixerWindmill.update(windmillClock.getDelta())
  requestAnimationFrame(animation)
}

animation()
