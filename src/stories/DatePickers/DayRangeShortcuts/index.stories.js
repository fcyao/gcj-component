import '@/stories/baseImport'
import DayRangeShortcuts from '@/components/DatePickers/DayRangeShortcuts'
export default {
  title: '日期组件/多选日带快捷项',
  component: DayRangeShortcuts,
  argTypes: {
    size: { control: { type: 'select', options: ['large', 'small', 'mini'] }}
  }
}

const DayRangeShortcutsComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DayRangeShortcuts },
  template:
    '<DayRangeShortcuts  v-bind="$props"  />'
})

export const DayRangeShortcutsTemp = DayRangeShortcutsComp.bind({})

