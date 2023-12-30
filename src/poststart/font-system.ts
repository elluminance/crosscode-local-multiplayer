sc.FontSystem.inject({
    gamepadUpdate: false,
    
    onVarsChanged() {
        if(this.gamepadUpdate) {
            ig.input.currentDevice = this.gamepadIcons ? ig.INPUT_DEVICES.KEYBOARD_AND_MOUSE : ig.INPUT_DEVICES.GAMEPAD;
            this.parent();
        }
    }
})

