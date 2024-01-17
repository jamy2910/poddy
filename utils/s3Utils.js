import { DeleteObjectCommand, PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketName = process.env.S3_BUCKET_CHANNEL;
const secretKey = process.env.S3_CHANNEL_SECRET;
const accessKey = process.env.S3_CHANNEL_ACCESS;
const podcastBucket = process.env.S3_BUCKET_PODCAST;

// Create new instance of s3 client
const s3 = new S3Client({
    region: 'eu-west-2',
    credentials: {
        secretAccessKey: secretKey,
        accessKeyId: accessKey
    }
});

// !--- CHANNEL UTILS ---!

export const uploadChannelPicToS3 = async (file) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: file.id,
        Body: file.buffer,
        ContentType: file.mimetype
    });

    await s3.send(command);
};

export const deleteChannelPic = async (fileId) => {
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileId
    });

    await s3.send(command);
}

export const getChannelPreSignedUrl = async (file) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: file.id
    });

    const url = await getSignedUrl(s3, command);

    file.url = url;

}


// !--- PODCAST UPLOAD UTILS ---!

export const getUploadUrlPodcast = async (podcastId) => {
    const command = new PutObjectCommand({
        Bucket: podcastBucket,
        Key: `podcast/${podcastId}`
    });

    const url = await getSignedUrl(s3, command);

    return url;
}

export const uploadPodcastThumbnail = async (file) => {
    const command = new PutObjectCommand({
        Bucket: podcastBucket,
        Key: `thumbnail/${file.id}`,
        Body: file.buffer,
        ContentType: file.mimetype
    });

    await s3.send(command);
}

export const uploadPodcast = async (file) => {
    const command = new PutObjectCommand({
        Bucket: podcastBucket,
        Key: `podcast/${file.id}`,
        Body: file.buffer,
        ContentType: file.mimetype
    });

    await s3.send(command);
}

export const deletePodcast = async (id) => {
    const command = new DeleteObjectCommand({
        Bucket: podcastBucket,
        Key: id
    });

    await s3.send(command);
}

export const getPodcastPreSignedUrl = async (file) => {
    const command = new GetObjectCommand({
        Bucket: podcastBucket,
        Key: `thumbnail/${file.id}`
    });

    const url = await getSignedUrl(s3, command);

    file.url = url;
}