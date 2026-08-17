#!/bin/bash

###############################################################################
# Common reporting functions for Harbormaster certification workflows
###############################################################################

post_result() {

    local TIER="$1"
    local STEP="$2"
    local STATUS="$3"
    local SCORE="$4"
    local MESSAGE="$5"
    local DETAIL="$6"
    local TERMINATE="${7:-false}"

    # Keep HarborMaster payloads bounded (preserved from master).
    MAX=5000
    if [ ${#DETAIL} -gt $MAX ]; then
        DETAIL="${DETAIL:0:$MAX}"
    fi

    RESPONSE_FILE="${RUNNER_TEMP}/response.txt"
    : > "${RESPONSE_FILE}"

    # Do not use `curl ... || echo 000` — on connect failure curl already
    # writes http_code 000, and appending makes 000000. Never let reporting
    # fail the job (workflows run with bash -e).
    HTTP_STATUS=$(
        curl \
            --silent \
            --fail-with-body \
            --write-out "%{http_code}" \
            --output "${RESPONSE_FILE}" \
            -X POST "${RESULT_URL}/${ACTION_TO_CALL}" \
            --data-urlencode "certificationIdentifier=${CERTIFICATION_IDENTIFIER}" \
            --data-urlencode "tier=${TIER}" \
            --data-urlencode "step=${STEP}" \
            --data-urlencode "status=${STATUS}" \
            --data-urlencode "score=${SCORE}" \
            --data-urlencode "message=${MESSAGE}" \
            --data-urlencode "detail=${DETAIL}" \
            --data-urlencode "application=${APP_NAME}" \
            --data-urlencode "terminate=${TERMINATE}" \
        || true
    )
    HTTP_STATUS="${HTTP_STATUS:-000}"

    echo "Harbormaster returned HTTP ${HTTP_STATUS}"
    echo "Response:"
    cat "${RESPONSE_FILE}" 2>/dev/null || true
    rm -f "${RESPONSE_FILE}"

    if [ "${HTTP_STATUS}" != "200" ]; then
        echo "Failed to update Harbormaster."
    fi
}

post_pass() {

    post_result \
        "$1" \
        "$2" \
        "PASSED" \
        "$3" \
        "$4" \
        "$5"
}

post_fail() {

    post_result \
        "$1" \
        "$2" \
        "FAILED" \
        "$3" \
        "$4" \
        "$5"
}

post_warning() {

    post_result \
        "$1" \
        "$2" \
        "WARNING" \
        "$3" \
        "$4" \
        "$5"
}

post_terminate_build() {

    local EXIT_WORKFLOW="${1:-true}"

    post_result \
        "BUILD" \
        "" \
        "" \
        0 \
        "" \
        "" \
        "true"

    if [ "$EXIT_WORKFLOW" = "true" ]; then
        exit 1
    fi
}

post_terminate_runtime() {

    local EXIT_WORKFLOW="${1:-true}"

    post_result \
        "RUNTIME" \
        "" \
        "" \
        0 \
        "" \
        "" \
        "true"

    if [ "$EXIT_WORKFLOW" = "true" ]; then
        exit 1
    fi
}

post_terminate_delivery() {

    local EXIT_WORKFLOW="${1:-true}"

    post_result \
        "DELIVERY" \
        "" \
        "" \
        0 \
        "" \
        "" \
        "true"

    if [ "$EXIT_WORKFLOW" = "true" ]; then
        exit 1
    fi
}

post_terminate_cloud() {

    local EXIT_WORKFLOW="${1:-true}"

    post_result \
        "CLOUD" \
        "" \
        "" \
        0 \
        "" \
        "" \
        "true"

    if [ "$EXIT_WORKFLOW" = "true" ]; then
        exit 1
    fi
}