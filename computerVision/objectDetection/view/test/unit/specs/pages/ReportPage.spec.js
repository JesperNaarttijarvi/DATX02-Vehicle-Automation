import { mount } from '@vue/test-utils'
import ReportPage from '@/components/reportPage/ReportPage.vue'
import reportHandler from '@/services/reportHandler'

jest.mock('@/services/reportHandler', () => ({
  getReportData: jest.fn().mockResolvedValue([]),
  getAvailableReports: jest.fn().mockResolvedValue([{
    label: 'Report name',
    id: 1
  }]),
  getSuggestedIntervals: jest.fn().mockResolvedValue([{
    label: 'This week',
    value: {
      from: '',
      to: ''
    }
  }])
}))

describe('ReportPage.vue', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = await mount(ReportPage)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('should fetch data on init', async () => {
    expect(reportHandler.getAvailableReports).toBeCalled()
    expect(reportHandler.getSuggestedIntervals).toBeCalled()
    expect(reportHandler.getReportData).toBeCalled()
  })
})
