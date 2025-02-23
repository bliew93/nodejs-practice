import pgPool from "../config/db.js";
import {
  getAllShortenedUrls,
  getShortenedUrl as getShortUrl,
  createShortenedUrl as createShortURL,
  deleteShortenedUrl,
} from "../models/shortenedUrl.model.js";

export const shortenedUrlsIndex = async (req, res, next) => {
  const shortenedUrls = await getAllShortenedUrls();

  res.status(200).json({
    success: true,
    data: {
      shortenedUrls: shortenedUrls.rows,
    },
  });
};

export const getShortenedUrl = async (req, res, next) => {
  try {
    const urlId = req.params.id;

    const shortenedUrl = await getShortUrl(urlId);

    if (shortenedUrl.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Shortened URL not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shortened URL found",
      data: {
        shortenedUrl: shortenedUrl.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createShortenedUrl = async (req, res, next) => {
  try {
    const { url } = req.body;

    const shortened_url = await pgPool.query(
      "SELECT * FROM shortened_urls WHERE shortened_urls.url = $1",
      [url]
    );

    if (shortened_url.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Shortened URL already exists",
        data: {
          shortenedUrl: shortened_url.rows[0],
        },
      });
    }

    const shortenedUrl = await createShortURL(url);

    res.status(201).json({
      success: true,
      message: "Shortened URL created successfully",
      data: {
        shortenedUrl: shortenedUrl.rows[0],
      },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const removeShortenedUrl = async (req, res, next) => {
  try {
    const urlId = req.params.id;

    const shortenedUrl = await getShortUrl(urlId);

    if (shortenedUrl.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Shortened URL not found",
      });
    }

    await deleteShortenedUrl(urlId);

    res.status(200).json({
      success: true,
      message: "Shortened URL deleted successfully",
      data: {
        shortenedUrl: shortenedUrl.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
