import {
  Comment,
  EmptyCollectModuleSettings,
  FeeCollectModuleSettings,
  LimitedFeeCollectModuleSettings,
  LimitedTimedFeeCollectModuleSettings,
  Mirror,
  NewCollectNotification,
  NewCommentNotification,
  NewMirrorNotification,
  Post,
  RevertCollectModuleSettings,
  TimedFeeCollectModuleSettings
} from './types'

export type BCharityPost = Post & Mirror & Comment & { pubId: string }
export type Program = Post & { pubId: string }
export type Volunteer = Post & { pubId: string }
export type Fundraise = Post & { pubId: string }
export type BCharityCollectModule = EmptyCollectModuleSettings &
  FeeCollectModuleSettings &
  LimitedFeeCollectModuleSettings &
  LimitedTimedFeeCollectModuleSettings &
  RevertCollectModuleSettings &
  TimedFeeCollectModuleSettings
export type BCharityAttachment = { item: string; type: string }
export type UserSuggestion = {
  uid: string
  id: string
  display: string
  name: string
  picture: string
}
