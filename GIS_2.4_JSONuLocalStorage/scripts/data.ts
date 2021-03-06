namespace script {
    // pictures of body parts

    const data: object = {
        heads: [
            "img/heads/1.jpg",
            "img/heads/2.jpg",
            "img/heads/3.jpg",
            "img/heads/4.jpg"
        ],
        bodies: [
            "img/bodies/1.jpg",
            "img/bodies/2.jpg",
            "img/bodies/3.jpg"
        ],
        legs: [
            "img/legs/1.jpg",
            "img/legs/2.jpg"
        ]
    };

    export const dataJSON: string = JSON.stringify(data);
}