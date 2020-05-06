export default {
    getImage: (imageName) => {
        if(imageName !== undefined || imageName !== null) {
            return "http://localhost:30100/" + imageName;
        } else {
            return undefined;
        }
    }
};