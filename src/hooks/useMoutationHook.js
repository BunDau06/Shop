import { useMutation } from "@tanstack/react-query"

export const useMoutationHooks = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
      })
      return mutation
}