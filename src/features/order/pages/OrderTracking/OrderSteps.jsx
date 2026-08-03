import {
  ORDER_STEPS,
  getStepState,
} from "../../../../shared/utils/orderStatusUtils";

export default function OrderSteps({ status }) {
  return (
    <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider">
        Trạng thái vận chuyển
      </h3>
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        <div className="hidden md:block absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-gray-200 -z-0">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{
              width:
                status === "Pending"
                  ? "0%"
                  : status === "Processing"
                    ? "33.33%"
                    : status === "Shipped"
                      ? "66.66%"
                      : "100%",
            }}
          ></div>
        </div>

        {ORDER_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const state = getStepState(step.key, status);

          return (
            <div
              key={idx}
              className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-xs transition-all ${
                  state === "completed"
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : state === "active"
                      ? "bg-white border-[#E31837] text-[#E31837] ring-4 ring-red-100 animate-pulse"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col md:items-center">
                <span
                  className={`text-sm font-bold ${
                    state === "completed"
                      ? "text-emerald-600"
                      : state === "active"
                        ? "text-[#E31837]"
                        : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
                {state === "active" && (
                  <span className="text-[10px] text-gray-400 font-normal md:text-center animate-pulse">
                    Đang thực hiện...
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
