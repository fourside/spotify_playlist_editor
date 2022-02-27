import { msToTime } from "../date-format";

describe("msToTime", () => {
  test("0msは00:00を返す", () => {
    // arrange
    const ms = 0;
    // act
    const result = msToTime(ms);
    // assert
    expect(result).toBe("00:00");
  });

  test("秒数一桁のとき、頭ゼロ埋め", () => {
    // arrange
    const ms = 121 * 1000;
    // act
    const result = msToTime(ms);
    // assert
    expect(result).toBe("2:01");
  });

  test("60秒より小さいとき、分は00", () => {
    // arrange
    const ms = 51 * 1000;
    // act
    const result = msToTime(ms);
    // assert
    expect(result).toBe("00:51");
  });

  test("60秒より小さくて秒数が一桁のとき、分は00で秒は頭ゼロ埋め", () => {
    // arrange
    const ms = 3 * 1000;
    // act
    const result = msToTime(ms);
    // assert
    expect(result).toBe("00:03");
  });
});
