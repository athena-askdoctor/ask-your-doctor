<template>
  <q-page class="q-pa-sm bg-white">
    
    <div class="row justify-center items-center">
      <q-btn flat label="Prev" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat label="Next" @click="calendarNext" />
      <q-input color="blue-8" filled v-model="convertedDates" @input="onInputChanged" label="Enter last period" mask="####-##-## - ####-##-##" class="q-pa-sm">

      <div>
        <q-form
          v-if="contextDay"
          ref='event'
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-card v-if="addEvent" style="width: 400px;">
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title>
                {{ addOrUpdateEvent }} Event
              </q-toolbar-title>
              <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section class="inset-shadow">
              <q-input
                v-model="eventForm.title"
                label="Title"
                :rules="[v => v && v.length > 0 || 'Field cannot be empty']"
                autofocus
              />
              <q-input
                v-model="eventForm.details"
                label="Details"
              />
              <q-field
                v-model="eventForm.allDay"
                style="padding-bottom: 20px;"
              >
                <q-checkbox
                  v-model="eventForm.allDay"
                  label="All-Day event?"
                />
              </q-field>

              <q-input
                v-if="eventForm.allDay"
                v-model="eventForm.dateTimeStart"
                label="Enter date"
                mask="####-##-##"
                color="blue-6"
                outlined
                style="padding-bottom: 20px;"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy v-model="showDateScrollerAllDay">

                      <q-scroller
                        v-model="eventForm.dateTimeStart"
                        view="date"
                        :locale="locale"
                        :hour24-format="true"
                        :rounded-borders="true"
                        border-color="#2196f3"
                        bar-color="#2196f3"
                        text-color="white"
                        color="primary"
                        inner-text-color="primary"
                        inner-color="white"
                        :style="scrollerPopupStyle160"
                        @close="() => { showDateScrollerAllDay = false }"
                      />

                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <div v-else>
                <q-input
                  v-model="eventForm.dateTimeStart"
                  ref="dateTimeStart"
                  label="Event start date and time"
                  mask="####-##-## ##:##"
                  :rules="[val => checkDateTimeStart() || 'Start time cannot come after end time']"
                  outlined
                  color="blue-6"
                >
                  <template #append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy v-model="showDateTimeScrollerStart">

                        <q-scroller
                          v-model="eventForm.dateTimeStart"
                          view="date-time"
                          :locale="locale"
                          :hour24-format="true"
                          :rounded-borders="true"
                          border-color="#2196f3"
                          bar-color="#2196f3"
                          color="primary"
                          text-color="white"
                          inner-color="white"
                          inner-text-color="primary "
                          :style="scrollerPopupStyle280"
                          @close="() => { showDateTimeScrollerStart = false }"
                        />

                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                  v-model="eventForm.dateTimeEnd"
                  ref="dateTimeEnd"
                  label="Event end date and time"
                  mask="####-##-## ##:##"
                  :rules="[val => checkDateTimeEnd() || 'Start time cannot come after end time']"
                  color="blue-6"
                  outlined
                >
                  <template #append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy v-model="showDateTimeScrollerEnd">

                        <q-scroller
                          v-model="eventForm.dateTimeEnd"
                          view="date-time"
                          :locale="locale"
                          :hour24-format="true"
                          :rounded-borders="true"
                          border-color="#2196f3"
                          bar-color="#2196f3"
                          color="primary"
                          text-color="white"
                          inner-color="white"
                          inner-text-color="primary "
                          :style="scrollerPopupStyle280"
                          @close="() => { showDateTimeScrollerEnd = false }"
                        />

                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <q-input
                v-model="eventForm.icon"
                label="Icon"
                outlined
                clearable
                style="padding-bottom: 20px;"
              >
                <template #append>
                  <q-icon name="extension" class="cursor-pointer">
                    <q-popup-proxy v-model="showIconPicker">

                      <q-icon-picker
                        v-model="eventForm.icon"
                        :filter="eventForm.icon"
                        icon-set="fontawesome-v5"
                        tooltips
                        :pagination.sync="pagination"
                        style="height: 300px; width: 300px; background-color: white;"
                      />

                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                v-model="eventForm.bgcolor"
                label="Color"
                outlined
                clearable
              >
                <template #append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy>
                      <q-color v-model="eventForm.bgcolor"></q-color>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="OK" type="submit" color="primary"></q-btn>
              <q-btn flat label="Cancel" type="reset" color="primary" v-close-popup></q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    

        <template v-slot:append>
          <div class="q-gutter-sm" style="overflow: hidden;">
            <span>
              <q-icon name="far fa-calendar" class="cursor-pointer q-ma-md" />
              <q-popup-proxy v-model="showCalendar" anchor="top right" self="bottom middle">
                <q-calendar
                  ref="calendar"
                  v-model="selectedDate"
                  view="month"
                  locale="en-us"
                  transition-prev="slide-right"
                  transition-next="slide-left"
                  mini-mode
                  short-weekday-label
                  :selected-start-end-dates="startEndDates"
                  no-active-date
                  @mousedown:day2="onMouseDownDay"
                  @mouseup:day2="onMouseUpDay"
                  @mousemove:day2="onMouseMoveDay"
                  style="width: 170px;"
                />
              </q-popup-proxy>
            </span>
          </div>
        </template>
      </q-input>
    </div>
    <q-separator />
    <q-calendar
      ref="calendar"
      v-model="selectedDate"
      view="month"
      locale="en-us"
      animated
      no-active-date
      transition-prev="slide-right"
      transition-next="slide-left"
      :selected-dates="selectedDates"
      @click:day2="onToggleDay"
      @click:date2="onToggleDate"
    >
      <template #week="{ week, weekdays, miniMode }">
        <template>
          <template v-for="(computedEvent, index) in getWeekEvents(week, weekdays)">
            <q-badge
              :key="index"
              class="q-row-event"
              :class="badgeClasses(computedEvent, 'day')"
              :style="badgeStyles(computedEvent, 'day', week.length)"
            >
              <template v-if="computedEvent.event">
                <q-icon :name="computedEvent.event.icon" class="q-mr-xs"></q-icon>
                <span class="ellipsis">{{ computedEvent.event.title }}</span>
              </template>
            </q-badge>
          </template>
        </template>
      </template>
    </q-calendar>
  </q-page>
</template>

<script>// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'

function leftClick (e) {
  return e.button === 0
}

const CURRENT_DAY = new Date()

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = QCalendar.parseDate(newDay)
  return tm.date
}

export default {
  name: 'Periodtracker',
  data() {
    return {
      selectedDate: '',
      selectedDates: [],
      convertedDates: '',
      showCalendar: false,
      anchorTimestamp: '',
      otherTimestamp: '',
      mouseDown: false,
      mobile: false,
      events: [
        {
          title: 'Period',
          color: 'orange',
          start: getCurrentDay(1),
          end: getCurrentDay(6),
          icon: 'fas fa-tint'
        },
        {
          title: 'Ovulation',
          color: 'pink',
          start: getCurrentDay(20),
          end: getCurrentDay(22),
          icon: 'cake'
        },
        {
          title: 'Meeting',
          color: 'red',
          start: getCurrentDay(8),
          end: getCurrentDay(8),
          icon: 'group'
        },
        {
          title: 'Lunch',
          color: 'teal',
          start: getCurrentDay(8),
          end: getCurrentDay(8),
          icon: 'free_breakfast'
        },
        {
          title: 'Visit Mom',
          color: 'blue-grey',
          start: getCurrentDay(20),
          end: getCurrentDay(20),
          icon: 'card_giftcard'
        },
        {
          title: 'Conference',
          color: 'blue',
          start: getCurrentDay(22),
          end: getCurrentDay(22),
          icon: 'ondemand_video'
        },
        {
          title: 'Girlfriend',
          color: 'teal',
          start: getCurrentDay(22),
          end: getCurrentDay(22),
          icon: 'fastfood'
        },
        {
          title: 'Rowing',
          color: 'yellow',
          start: getCurrentDay(27),
          end: getCurrentDay(28),
          icon: 'rowing'
        },
        {
          title: 'Vacation',
          color: 'purple',
          start: getCurrentDay(22),
          end: getCurrentDay(24),
          icon: 'flight'
        }
      ]
    }
  },
  computed: {
    startEndDates () {
      const dates = []
      if (this.anchorDayIdentifier !== false && this.otherDayIdentifier !== false) {
        if (this.anchorDayIdentifier <= this.otherDayIdentifier) {
          dates.push(this.anchorTimestamp.date, this.otherTimestamp.date)
        }
        else {
          dates.push(this.otherTimestamp.date, this.anchorTimestamp.date)
        }
      }
      return dates
    },
    anchorDayIdentifier () {
      if (this.anchorTimestamp !== '') {
        return QCalendar.getDayIdentifier(this.anchorTimestamp)
      }
      return false
    },
    otherDayIdentifier () {
      if (this.otherTimestamp !== '') {
        return QCalendar.getDayIdentifier(this.otherTimestamp)
      }
      return false
    },
    lowIdentifier () {
      // returns lowest of the two values
      return Math.min(this.anchorDayIdentifier, this.otherDayIdentifier)
    },
    highIdentifier () {
      // returns highest of the two values
      return Math.max(this.anchorDayIdentifier, this.otherDayIdentifier)
    }
  },
  methods: {
    onInputChanged (val) {
      const items = val.split(' - ')
      if (items[0] && items[0].length === 10) this.anchorTimestamp = QCalendar.parseTimestamp(items[0])
      if (items[1] && items[1].length === 10) this.otherTimestamp = QCalendar.parseTimestamp(items[1])
    },
    calendarNext () {
      this.$refs.calendar.next()
    },

    calendarPrev () {
      this.$refs.calendar.prev()
    },

    onMouseDownDay ({ scope, event }) {
      if (leftClick(event)) {
        if (this.mobile === true &&
          this.anchorTimestamp !== null &&
          this.otherTimestamp !== null &&
          this.anchorTimestamp.date === this.otherTimestamp.date) {
          this.otherTimestamp = scope.timestamp
          this.mouseDown = false
          return
        }
        // mouse is down, start selection and capture current
        this.mouseDown = true
        this.anchorTimestamp = scope.timestamp
        this.otherTimestamp = scope.timestamp
      }
    },
    onMouseUpDay ({ scope, event }) {
      if (leftClick(event)) {
        // mouse is up, capture last and cancel selection
        this.otherTimestamp = scope.timestamp
        this.mouseDown = false
      }
    },
    onMouseMoveDay ({ scope, event }) {
      if (this.mouseDown === true) {
        this.otherTimestamp = scope.timestamp
      }
    },

    onToggleDate ({ scope }) {
      if (scope !== undefined) {
        this.toggleDate(scope)
      }
      myevent: [
        {
          title: 'Period',
          color: 'green',
          start: getCurrentDay(7),
          end: getCurrentDay(7)
        }]
      this.insertEvent(myevent, week.length, infoWeek, i, 0, 0)
      const data = {
            title: form.title,
            date: String(form.dateTimeStart).slice(0, 10).replace(/\//g, '-')
          }

    },

    onToggleDay ({ scope }) {
      if (scope !== undefined) {
        this.toggleDate(scope)
      }
      myevent: [
        {
          title: 'Period',
          color: 'green',
          start: getCurrentDay(7),
          end: getCurrentDay(7)
        }]
      this.insertEvent(myevent, week.length, infoWeek, i, 0, 0)
    },

    toggleDate (scope) {
      const date = scope.timestamp.date
      if (this.selectedDates.includes(date)) {
        // remove the date
        for (let i = 0; i < this.selectedDates.length; ++i) {
          if (date === this.selectedDates[i]) {
            this.selectedDates.splice(i, 1)
            break
          }
        }
      }
      else {
        // add the date if not outside
        if (scope.outside !== true) {
          this.selectedDates.push(date)
        }
      }
    },

    isCssColor(color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },

    badgeClasses(infoEvent, type) {
      const color = infoEvent.event !== void 0 ? infoEvent.event.color : 'transparent'
      const cssColor = this.isCssColor(color)
      const isHeader = type === 'header'

      return {
        [`text-white bg-${color}`]: !cssColor,
        'full-width': !isHeader && (!infoEvent.side || infoEvent.side === 'full'),
        'left-side': !isHeader && infoEvent.side === 'left',
        'right-side': !isHeader && infoEvent.side === 'right',
        'cursor-pointer': infoEvent.event !== void 0,
        'event-void': infoEvent.event === void 0 // height: 0, padding: 0
      }
    },

    badgeStyles(infoEvent, type, weekLength, timeStartPos, timeDurationHeight) {
      const s = {}
      if (timeStartPos) {
        s.top = timeStartPos(infoEvent.event.time) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(infoEvent.event.duration) + 'px'
      }
      if (infoEvent.size !== void 0) {
        s.width = ((100 / weekLength) * infoEvent.size) + '% !important'
      }
      // s['align-items'] = 'flex-start'
      return s
    },

    getWeekEvents(week, weekdays) {
      const tsFirstDay = QCalendar.parsed(week[0].date + ' 00:00')
      const tsLastDay = QCalendar.parsed(week[week.length - 1].date + ' 23:59')
      const firstDay = QCalendar.getDayIdentifier(tsFirstDay)
      const lastDay = QCalendar.getDayIdentifier(tsLastDay)

      const eventsWeek = []
      this.events.forEach((event, id) => {
        const tsStartDate = QCalendar.parsed(event.start + ' 00:00')
        const tsEndDate = QCalendar.parsed(event.end + ' 23:59')
        const startDate = QCalendar.getDayIdentifier(tsStartDate)
        const endDate = QCalendar.getDayIdentifier(tsEndDate)

        if (this.isBetweenDatesWeek(startDate, endDate, firstDay, lastDay)) {
          const left = QCalendar.daysBetween(tsFirstDay, tsStartDate, true)
          const right = QCalendar.daysBetween(tsEndDate, tsLastDay, true)

          eventsWeek.push({
            id, // index event
            left, // Position initial day [0-6]
            right, // Number days available
            size: week.length - (left + right), // Size current event (in days)
            event // Info
          })
        }
      })

      const events = []
      if (eventsWeek.length > 0) {
        const infoWeek = eventsWeek.sort((a, b) => a.left - b.left)
        infoWeek.forEach((event, i) => {
          this.insertEvent(events, week.length, infoWeek, i, 0, 0)
        })
      }

      return events
    },

    insertEvent(events, weekLength, infoWeek, index, availableDays, level) {
      const iEvent = infoWeek[index]
      if (iEvent !== void 0 && iEvent.left >= availableDays) {
        // If you have space available, more events are placed
        if (iEvent.left - availableDays) {
          // It is filled with empty events
          events.push({size: iEvent.left - availableDays})
        }
        // The event is built
        events.push({size: iEvent.size, event: iEvent.event})

        if (level !== 0) {
          // If it goes into recursion, then the item is deleted
          infoWeek.splice(index, 1)
        }

        const currentAvailableDays = iEvent.left + iEvent.size

        if (currentAvailableDays < weekLength) {
          const indexNextEvent = QCalendar.indexOf(infoWeek, e => e.id !== iEvent.id && e.left >= currentAvailableDays)

          this.insertEvent(
            events,
            weekLength,
            infoWeek,
            indexNextEvent !== -1 ? indexNextEvent : index,
            currentAvailableDays,
            level + 1
          )
        } // else: There are no more days available, end of iteration
      } else {
        events.push({size: weekLength - availableDays})
        // end of iteration
      }
    },

    isBetweenDates(date, start, end) {
      return date >= start && date <= end
    },

    isBetweenDatesWeek(dateStart, dateEnd, weekStart, weekEnd) {
      return (
        (dateEnd < weekEnd && dateEnd >= weekStart) ||
        dateEnd === weekEnd ||
        (dateEnd > weekEnd && dateStart <= weekEnd)
      )
    },

    getEvents (dt) {
      const currentDate = QCalendar.parseTimestamp(dt)
      const events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        const event = this.events[i]
        if (event.date === dt) {
          if (event.time !== undefined) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendar.parseTimestamp(event.date + ' ' + event.time)
              const endTime = QCalendar.addToDate(startTime, { minute: event.duration })
              for (let j = 0; j < events.length; ++j) {
                const evt = events[j]
                if (evt.time !== undefined) {
                  const startTime2 = QCalendar.parseTimestamp(evt.date + ' ' + evt.time)
                  const endTime2 = QCalendar.addToDate(startTime2, { minute: evt.duration })
                  if (QCalendar.isBetweenDates(startTime, startTime2, endTime2) || QCalendar.isBetweenDates(endTime, startTime2, endTime2)) {
                    evt.side = 'left'
                    event.side = 'right'
                    events.push(event)
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            event.side = undefined
            events.push(event)
          }
        }
        else if (event.days) {
          // check for overlapping dates
          const startDate = QCalendar.parseTimestamp(event.date)
          const endDate = QCalendar.addToDate(startDate, { day: event.days })
          if (QCalendar.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(event)
            added = true
          }
        }
      }
      return events
    },

    saveEvent () {
      const self = this
      this.$refs.event.validate().then((success) => {
        if (success) {
          // close the dialog
          self.addEvent = false
          const form = { ...self.eventForm }
          let update = false
          if (self.contextDay.bgcolor) {
            // an update
            update = true
          }
          else {
            // an add
          }
          const data = {
            title: form.title,
            details: form.details,
            icon: form.icon,
            bgcolor: form.bgcolor,
            date: String(form.dateTimeStart).slice(0, 10).replace(/\//g, '-')
          }
          if (form.allDay === false) {
            // get time into separate var
            data.time = String(form.dateTimeStart).slice(11, 16)
            data.duration = self.getDuration(form.dateTimeStart, form.dateTimeEnd, 'minutes')
          }
          if (update === true) {
            const index = self.findEventIndex(self.contextDay)
            if (index >= 0) {
              self.events.splice(index, 1, { ...data })
            }
          }
          else {
            // add to events array
            self.events.push(data)
          }
          self.contextDay = null
        }
      })
    }

  },
  watch: {
    startEndDates () {
      const [start, end] = this.startEndDates
      this.convertedDates = `${start} - ${end}`
    },
    selectedDates (val) {
      /* eslint-disable-next-line */
      console.log('selected dates:', val)
    }
  }
}
</script>

<style scoped>

</style>
