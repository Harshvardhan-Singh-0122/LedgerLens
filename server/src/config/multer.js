// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {
//         const uniqueName =
//             Date.now() +
//             "-" +
//             Math.round(Math.random() * 1e9);

//         cb(
//             null,
//             uniqueName + path.extname(file.originalname)
//         );
//     },
// });

// const fileFilter = (req, file, cb) => {
//     const extension = path.extname(file.originalname).toLowerCase();

//     if (extension !== ".csv") {
//         return cb(
//             new Error("Only CSV files are allowed."),
//             false
//         );
//     }

//     cb(null, true);
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 10 * 1024 * 1024, // 10 MB
//     },
// });

// export default upload;


//------------------For Deploayment-------------
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".csv") {
        return cb(
            new Error("Only CSV files are allowed."),
            false
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

export default upload;