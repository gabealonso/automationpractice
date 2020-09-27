class navigation {
    get siBtn () {return $('.login')}
    get loBtn () {return $('.logout')}

    signin(){
        this.siBtn.click();
    }

    logout() {
        this.loBtn.click();
    }
}

export default new navigation();