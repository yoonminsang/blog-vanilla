export const corsConfig = () => {
  return {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  };
};
