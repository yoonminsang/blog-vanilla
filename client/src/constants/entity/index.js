const USER_ENTITY = {
  emailMaxLength: 45,
  nicknameMinLength: 2,
  nicknameMaxLength: 15,
  passwordMinLength: 4,
  passwordMaxLength: 20,
  hashPasswordLength: 60,
};

const POST_ENTITY = {
  titleMaxLength: 40,
};

const COMMENT_ENTITY = {
  contentMaxLength: 45,
};

export { USER_ENTITY, POST_ENTITY, COMMENT_ENTITY };
