interface PaymentStatusResponse {
    status: 'SUCCESS' | 'PENDING';
}

/**
 * Simulates verifying a payment by using a random outcome.
 * This is a mock service and does not contact any external payment provider.
 * It introduces a delay to feel more realistic.
 */
export const verifyPaymentStatus = async (): Promise<PaymentStatusResponse> => {
    // Simulate network delay to make verification feel real
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a 90% success rate, 10% pending/failure rate
    const isSuccessful = Math.random() < 0.9;

    if (isSuccessful) {
        return { status: 'SUCCESS' };
    } else {
        return { status: 'PENDING' };
    }
};
