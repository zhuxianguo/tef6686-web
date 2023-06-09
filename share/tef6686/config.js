const PATCH_TAB = [
  //PatchByteValues
  { method: 'Tuner_WriteBuffer', data: [0x1c, 0x00, 0x00], des: 'Clear Required Initialization Control' },
  { method: 'Tuner_WriteBuffer', data: [0x1C, 0x00, 0x74], des: 'Set Required Initialization Control(1)' },
  { method: 'Tuner_Patch_Load', data: PatchByteValues, des: 'PatchByteValues' },
  //LutByteValues
  { method: 'Tuner_WriteBuffer', data: [0x1c, 0x00, 0x00], des: 'Clear Required Initialization Control' },
  { method: 'Tuner_WriteBuffer', data: [0x1C, 0x00, 0x75], des: 'Set Required Initialization Control(2)' },
  { method: 'Tuner_Patch_Load', data: LutByteValues, des: 'LutByteValues' },
]
const START_TAB = [
  { method: 'Tuner_WriteBuffer', data: [0x1c, 0x00, 0x00], des: 'Clear Required Initialization Control' },
  { method: 'Tuner_WriteBuffer', data: [0x14, 0x00, 0x01], des: 'Start Firmware....' },
]
const CLOCK_TAB = [
  // { method: 'Tuner_WriteBuffer', data: [0x40, 0x04, 0x01, 0x00, 0x8C, 0xA0, 0x00, 0x00, 0x00], des: ' 9216M APPL_Set_ReferenceClock' },
  { method: 'Tuner_WriteBuffer', data: [0x40, 0x04, 0x01, 0x00, 0x3D, 0x09, 0x00, 0x00, 0x00], des: ' 4000 MHz crystal reference' },
]
const ACTIVE_TAB = [
  { method: 'Tuner_WriteBuffer', data: [0x40, 0x05, 0x01, 0x00, 0x01], des: ' APPL_Activate' }
]