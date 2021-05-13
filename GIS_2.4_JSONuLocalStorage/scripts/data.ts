namespace script {
    // pictures of body parts

    const data: object = {
        heads: {
            1: "img/heads/1.jpg",
            2: "img/heads/2.jpg",
            3: "img/heads/3.jpg",
            4: "img/heads/4.jpg"
        },
        bodies: {
            1: "img/bodies/1.jpg",
            2: "img/bodies/2.jpg",
            3: "img/bodies/3.jpg"
        },
        legs: {
            1: "img/legs/1.jpg",
            2: "img/legs/2.jpg"
        }
    };

    export const dataJSON: string = JSON.stringify(data);
}