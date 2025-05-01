export interface TimeFrequencyData {
  time: number
  frequency: number
  amplitude: number
}

export interface AnalysisData {
  /**
   * 均值
   */
  avg: number
  /**
   * 峰值
   */
  peak: number
  /**
   * 均方根
   */
  rms: number
  /**
   * 裕度
   */
  margin: number
  /**
   * 标准差
   */
  std: number
  /**
   * 方差
   */
  variance: number
  /**
   * 峭度
   */
  kurtosis: number
  /**
   * 偏度
   */
  skewness: number
}

// 样本数据
export interface SampleData {
  data: TimeFrequencyData[]
  analysis: AnalysisData
}
