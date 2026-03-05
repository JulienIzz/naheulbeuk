import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

import header from "#assets/images/header.jpg";
import logo from "#assets/images/logo.png";
import paper from "#assets/images/paper.jpg";
import s1 from "#assets/images/s1.jpg";
import s2 from "#assets/images/s2.jpg";
import s3 from "#assets/images/s3.jpg";
import wood from "#assets/images/wood.jpg";

const images = [header, logo, paper, wood, s1, s2, s3];

export const usePreloadAssets = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(function preloadImageAssets() {
    void Asset.loadAsync(images).then(() => {
      setAssetsLoaded(true);
    });
  }, []);

  return { assetsLoaded };
};
