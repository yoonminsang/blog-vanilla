import { USER_ENTITY } from '../../constants/entity';

const EMAIL_EMPTY = `이메일을 입력해주세요`;
const EMAIL_FORM = `올바르지 않은 이메일 형식입니다`;
const EMAIL_MAX_LENGTH = `이메일은 ${USER_ENTITY.emailMaxLength}자를 넘길 수 없습니다`;
const PASSWORD_EMPTY = `비밀번호를 입력하세요`;
const PASSWORD_MIN_LENGTH = `비밀번호는 ${USER_ENTITY.passwordMinLength}자 이상 입력해야 합니다`;
const PASSWORD_MAX_LENGTH = `비밀번호는 ${USER_ENTITY.passwordMaxLength}자를 넘길 수 없습니다`;
const PASSWORD_CONFIRM_EMPTY = `비밀번호 확인을 입력하세요`;
const PASSWORD_IS_NOT_SAME = `비밀번호와 비밀번호확인이 일치하지 않습니다`;
const PASSWORD_INVALID_REGEX = `비밀번호는 대소문자, 숫자, 특수문자를 포함해야합니다`;
const NICKNAME_EMPTY = `닉네임을 입력해주세요`;
const NICKNAME_MIN_LENGTH = `닉네임은 ${USER_ENTITY.nicknameMinLength}자 이상 입력해야 합니다`;
const NICKNAME_MAX_LENGTH = `닉네임은 ${USER_ENTITY.nicknameMaxLength}자를 넘길 수 없습니다`;

const signupValidation = ({ email, password, passwordConfirm, nickname }) => {
  if (!email) return EMAIL_EMPTY;
  if (
    // eslint-disable-next-line no-control-regex
    !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email,
    )
  )
    return EMAIL_FORM;
  if (email.length > USER_ENTITY.emailMaxLength) return EMAIL_MAX_LENGTH;
  if (!password) return PASSWORD_EMPTY;
  if (password.length < USER_ENTITY.passwordMinLength) return PASSWORD_MIN_LENGTH;
  if (password.length > USER_ENTITY.passwordMaxLength) return PASSWORD_MAX_LENGTH;
  if (!passwordConfirm) return PASSWORD_CONFIRM_EMPTY;
  if (password !== passwordConfirm) return PASSWORD_IS_NOT_SAME;
  if (!nickname) return NICKNAME_EMPTY;
  if (nickname.length < USER_ENTITY.nicknameMinLength) return NICKNAME_MIN_LENGTH;
  if (nickname.length > USER_ENTITY.nicknameMaxLength) return NICKNAME_MAX_LENGTH;
  if ((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, password)) return PASSWORD_INVALID_REGEX;
  return true;
};

const loginValidation = ({ email, password }) => {
  if (!email) return EMAIL_EMPTY;
  if (!password) return PASSWORD_EMPTY;
  return true;
};

export { signupValidation, loginValidation };
