// @flow
/* eslint key-spacing: "off" */
/**
 * Mapping of QWERTY key codes to MIDI
 * The first 3 notes are not playable with the QWERTY keyboard,
 * but they can be played with the mouse.
 */
export const qwertyMidiMap = {
  A2: 45, // dummyKey -> A2
  'A+2': 46, // dummyKey -> A+2
  B2: 47, // dummyKey -> B2

  '90': 48, // Z -> C3
  '83': 49, // S -> C+3
  '88': 50, // X -> D3
  '68': 51, // D -> D+3
  '67': 52, // C -> E3
  '86': 53, // V -> F3
  '71': 54, // G -> F+3
  '66': 55, // B -> G3
  '72': 56, // H -> G+3
  '78': 57, // N -> A3
  '74': 58, // J -> A+3
  '77': 59, // M -> B3
  '188': 60, // , -> C4
  '76': 61, // L -> C+4
  '190': 62, // . -> D4
  '186': 63, // ; -> D+4
  '191': 64, // / -> E4

  '81': 60, // Q -> C4
  '50': 61, // 2 -> C+4
  '87': 62, // W -> D4
  '51': 63, // 3 -> D+4
  '69': 64, // E -> E4
  '82': 65, // R -> F4
  '53': 66, // 5 -> F+4
  '84': 67, // T -> G4
  '54': 68, // 6 -> G+4
  '89': 69, // Y -> A4
  '55': 70, // 7 -> A+4
  '85': 71, // U -> B4
  '73': 72, // I -> C5
  '57': 73, // 9 -> C#5
  '79': 74, // O -> D5
  '48': 75, // 0 -> D+5
  '80': 76, // P -> E5
};

/**
 * Returns the corresponding MIDI number for a QWERTY key code
 */
export const qwertytoMidi = (qwerty: string) => qwertyMidiMap[qwerty];
