export type HorizontalAlignmentT = 'Left' | 'Center' | 'Right'
export type VerticalAlignmentT = 'Top' | 'Center' | 'Bottom'

export type HarnessT = {
  theme: string, // ID
  horizontalAlignment: HorizontalAlignmentT,
  verticalAlignment: VerticalAlignmentT,
}
