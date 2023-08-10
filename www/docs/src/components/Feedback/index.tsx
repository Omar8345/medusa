import React, { useRef, useState, useEffect } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"

import useIsBrowser from "@docusaurus/useIsBrowser"
import { useLocation } from "@docusaurus/router"
import uuid from "react-uuid"
import Solutions from "./Solutions/index"
import Button from "../Button"
import { useUser } from "@site/src/providers/User"

type FeedbackProps = {
  event?: string
  question?: string
  positiveBtn?: string
  negativeBtn?: string
  positiveQuestion?: string
  negativeQuestion?: string
  submitBtn?: string
  submitMessage?: string
  showPossibleSolutions?: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const Feedback: React.FC<FeedbackProps> = ({
  event,
  question = "Was this page helpful?",
  positiveBtn = "Yes",
  negativeBtn = "No",
  positiveQuestion = "What was most helpful?",
  negativeQuestion = "What can we improve?",
  submitBtn = "Submit",
  submitMessage = "Thank you for helping improve our documentation!",
  showPossibleSolutions = true,
  className = "",
}) => {
  const [showForm, setShowForm] = useState(false)
  const [submittedFeedback, setSubmittedFeedback] = useState(false)
  const [loading, setLoading] = useState(false)
  const inlineFeedbackRef = useRef(null)
  const inlineQuestionRef = useRef(null)
  const inlineMessageRef = useRef(null)
  const [positiveFeedback, setPositiveFeedback] = useState(false)
  const [message, setMessage] = useState("")
  const [id, setId] = useState(null)
  const nodeRef = submittedFeedback
    ? inlineMessageRef
    : showForm
    ? inlineQuestionRef
    : inlineFeedbackRef

  const isBrowser = useIsBrowser()
  const location = useLocation()
  const { track } = useUser()

  function handleFeedback(e) {
    const feedback = e.target.classList.contains("positive")
    setPositiveFeedback(feedback)
    setShowForm(true)
    submitFeedback(e, feedback)
  }

  function submitFeedback(e, feedback = null) {
    if (isBrowser) {
      if (showForm) {
        setLoading(true)
      }
      track(
        event,
        {
          url: location.pathname,
          label: document.title,
          feedback:
            (feedback !== null && feedback) ||
            (feedback === null && positiveFeedback)
              ? "yes"
              : "no",
          message: message?.length ? message : null,
        },
        function () {
          if (showForm) {
            setLoading(false)
            resetForm()
          }
        }
      )
    }
  }

  function resetForm() {
    setShowForm(false)
    setSubmittedFeedback(true)
    if (message) {
      setId(null)
    }
  }

  useEffect(() => {
    if (!id) {
      setId(uuid())
    }
  }, [id])

  return (
    <div className={`py-2 ${className}`}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={
            showForm
              ? "show_form"
              : !submittedFeedback
              ? "feedback"
              : "submitted_feedback"
          }
          nodeRef={nodeRef}
          timeout={300}
          addEndListener={(done) => {
            nodeRef.current.addEventListener("transitionend", done, false)
          }}
          classNames={{
            enter: "animate__animated animate__fadeIn animate__fastest",
            exit: "animate__animated animate__fadeOut animate__fastest",
          }}
        >
          <>
            {!showForm && !submittedFeedback && (
              <div
                className="flex flex-row items-center"
                ref={inlineFeedbackRef}
              >
                <span className="mr-1.5 text-body-regular">
                  {question}
                </span>
                <Button
                  onClick={handleFeedback}
                  className="w-fit mr-0.5 last:mr-0 positive"
                >
                  {positiveBtn}
                </Button>
                <Button
                  onClick={handleFeedback}
                  className="w-fit mr-0.5 last:mr-0"
                >
                  {negativeBtn}
                </Button>
              </div>
            )}
            {showForm && !submittedFeedback && (
              <div className="flex flex-col" ref={inlineQuestionRef}>
                <span className="mb-1">
                  {positiveFeedback ? positiveQuestion : negativeQuestion}
                </span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-sm bg-transparent border border-medusa-border-base dark:border-medusa-border-base-dark p-1 font-base"
                ></textarea>
                <Button
                  onClick={submitFeedback}
                  disabled={loading}
                  className="mt-1 w-fit"
                >
                  {submitBtn}
                </Button>
              </div>
            )}
            {submittedFeedback && (
              <div>
                <div
                  className="flex flex-col text-label-large-plus"
                  ref={inlineMessageRef}
                >
                  <span>{submitMessage}</span>
                  {showPossibleSolutions && (
                    <Solutions message={message} feedback={positiveFeedback} />
                  )}
                </div>
              </div>
            )}
          </>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default Feedback
