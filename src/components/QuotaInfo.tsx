import React, { useEffect, useState } from "react";
import StyledText from "./StyledText";
import { useSupabaseUser } from "~/hooks/useSupabaseUser";
import { EXPO_PUBLIC_API_BASE_URL } from "~/utils/constants";

interface UsageInfo {
  used: number;
  limit: number;
}

const QuotaInfo = () => {
  const { user, token } = useSupabaseUser();
  const [usageInfo, setUsageInfo] = useState<UsageInfo>({ used: 0, limit: 5 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      if (!user || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${EXPO_PUBLIC_API_BASE_URL}/mobile-usage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsageInfo({
            used: data.todayUsage ?? 0,
            limit: data.dailyLimit ?? 5,
          });
        }
      } catch (error) {
        console.error("Error fetching quota info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [user, token]);

  if (!user || loading) return null;

  return (
    <StyledText className="mt-2 text-right text-sm font-light dark:text-white/60">
      {usageInfo.limit - usageInfo.used}/{usageInfo.limit} questions left.
    </StyledText>
  );
};

export default QuotaInfo;
