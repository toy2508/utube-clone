import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const S3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

process.env.NODE_ENV;

const multerUploader = multerS3({
  s3: S3,
  bucket: "wetub-clone-toy",
  acl: "public-read",
});

const s3ImageUploader = multerS3({
  s3: S3,
  bucket: "wetub-clone-toy/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: S3,
  bucket: "wetub-clone-toy/videos",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

// 로그인되어있는 경우에는 정상작동
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
};

// 로그인되어있지 않을때 정상작동
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
  storage: s3ImageUploader,
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
  storage: s3VideoUploader,
});
