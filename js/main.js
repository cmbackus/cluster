let babylon

let main = {
    geometries: []
    , lights: []
    , shaders: [],

    init() {
        babylon = BABYLON
        this.setup()

        let sphere = this.createSphere(0xff0000, "one", 16, 2)
            // let sphere2 = this.createSphere(0x00ff00, "two", 32, 1)
            // let box = this.createBox()
            //    let knot = this.createKnot(0x00ff00)

        this.createLights()

        this.applyFX()

        this.engine.runRenderLoop(this.render.bind(this))
    },

    setup() {
        this.canvas = document.querySelector('#babylonCanvas')
        this.engine = new babylon.Engine(this.canvas)
        this.scene = new babylon.Scene(this.engine)

        this.camera = new babylon.FreeCamera('camera1', new babylon.Vector3(0, 5, -10), this.scene)
        this.camera.setTarget(babylon.Vector3.Zero())

        this.camera.attachControl(this.canvas, false)
    },

    createSphere(color, name, x, scale) {
        let sphere = new babylon.Mesh.CreateSphere('sphere' + name, x, scale, this.scene)
        sphere.specularColor = new babylon.Color3(1, 0, 0);
        this.geometries.push(sphere)

        return sphere
    },

    createBox(color) {
        let box = new babylon.Mesh.CreateBox('box1', 2, this.scene)
        box.position = new babylon.Vector3(-2, 0, 0)
        box.specularColor = new babylon.Color3(.9, 0, 0);
        this.geometries.push(box)

        return box
    },

    applyFX() {
        let blurWidth = 2
        let postProcess = new BABYLON.BlurPostProcess(
            "Horizontal blur"
            , new BABYLON.Vector2(1.0, 0)
            , blurWidth
            , .5
            , null, null, this.engine, true);

        this.camera.attachPostProcess(postProcess)
    },

    addDotsShader() {
        let dots = new THREE.ShaderPass(THREE.DotScreenShader)
        dots.renderToScreen = true

        this.shaders.push(dots)
        this.composer.addPass(dots)
    },

    animate() {
        this.geometries.forEach(function (geo) {
            geo.rotation.x += .005
            geo.rotation.y += .005
        })
    },

    createLights() {
        let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.lights.push(light)
    },

    render() {
        this.animate()
        this.scene.render()
            //this.renderer.render( this.scene, this.camera )
            //this.composer.render()
    }
}

window.onload = () => main.init()