import { POST_ENTITY, USER_ENTITY } from '../entity';

const ERROR_JOI_MESSAGE = {
  invalidEmail: `올바르지 않은 이메일 형식입니다`,
  exceedMaxLengthEmail: `이메일은 ${USER_ENTITY.emailMaxLength}자를 넘길 수 없습니다`,
  fillEmail: `이메일을 입력해주세요`,
  underMinLengthNickname: `닉네임은 ${USER_ENTITY.nicknameMinLength}자 이상 입력해야 합니다`,
  exceedMaxLengthNickname: `닉네임은 ${USER_ENTITY.nicknameMaxLength}자를 넘길 수 없습니다`,
  fillNickname: `닉네임을 입력해주세요`,
  underMinLengthPassword: `비밀번호는 ${USER_ENTITY.passwordMinLength}자 이상 입력해야 합니다`,
  exceedMaxLengthPassword: `비밀번호는 ${USER_ENTITY.passwordMaxLength}자를 넘길 수 없습니다`,
  invalidRegexPassword: `비밀번호는 대소문자, 숫자, 특수문자를 포함해야합니다`,
  fillPassword: `비밀번호를 입력해주세요`,
  exceedMaxLengthTitle: `제목은 ${POST_ENTITY.titleMaxLength}자를 넘길 수 없습니다`,
  fillTitle: `제목을 입력해주세요`,
  notFoundPage: `존재하지 않는 페이지입니다`,
};

export default ERROR_JOI_MESSAGE;
